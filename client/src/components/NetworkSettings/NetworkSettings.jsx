import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Text} from '@consta/uikit/Text'
import {ProgressLine} from '@consta/uikit/ProgressLine'
import cl from './NetworkSettings.module.scss'
import {Button} from '@consta/uikit/Button'
import {IconPause} from '@consta/uikit/IconPause'
import {IconPlay} from '@consta/uikit/IconPlay'
import request from "../../api/request";

const NetworkSettings = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [ipInfo, setIpInfo] = useState(undefined)
    const [ping, setPing] = useState(undefined)

    const [rx, setRx] = useState(undefined)
    const [tx, setTx] = useState(undefined)

    const [rxProgress, setRxProgress] = useState(undefined)
    const [txProgress, setTxProgress] = useState(undefined)
    const controller = useMemo(() => new AbortController(), [isLoading])

    const resetData = useCallback(() => {
        setIpInfo(undefined)
        setPing(undefined)
        setRx(undefined)
        setTx(undefined)
        setRxProgress(undefined)
        setTxProgress(undefined)
    }, [])

    const buffer = useMemo(() => {
        let res = 'x'
        for (let i = 0; i < 23; i++) {
            res += res
        }
        return res
    }, [])

    useEffect(() => {
        const getIpInfo = async () => {
            const res = await request.network.ip()
            setIpInfo(res.data)
        }

        const getPing = async () => {
            const currentTime = Date.now()

            await request.network.ping()

            setPing(Math.floor(Date.now() - currentTime))
        }

        const setResOrProgress = (
            setProgress,
            setRes,
            progress
        ) => {
            const currentProgress = Math.floor((progress.loaded / progress.total) * 100)

            if (currentProgress < 100) {
                if (currentProgress < 99) {
                    setProgress(currentProgress)
                }
            }
        }

        const checkTX = async () => {
            const currentTime = Date.now()

            await request.network.tx(
                buffer,
                (progress) => {
                    setResOrProgress(setTxProgress, setTx, progress, currentTime)
                }
            )

            const currentPing = ping ?? 0
            const diff = Date.now() - currentTime - currentPing || 1
            console.log(diff);
            setTx(Number(buffer.length * 8 * 2 / diff / 1000).toFixed(2));
            setTxProgress(undefined)
        }

        const checkRX = async () => {
            const currentTime = Date.now()

            await request.network.rx((progress) => {
                setResOrProgress(setRxProgress, setRx, progress, currentTime)
            }, controller)

            const currentPing = ping ?? 0
            const diff = Date.now() - currentTime - currentPing || 1
            console.log(diff);
            setRx(Number(buffer.length * 8 * 2 / diff / 1000).toFixed(2))
            setRxProgress(undefined)
        }

        if (isLoading) {
            resetData()
            setIsLoading(true)
            getIpInfo().then(() =>
                getPing().then(() =>
                    checkTX().then(() =>
                        checkRX().then(() => setIsLoading(false))
                    )
                )
            )
        }
    }, [isLoading])

    return (
        <div className={cl.wrapper}>
            <div className={cl.infoWrapper}>
                <div className={cl.textWrapper}>
                    <Text view={'secondary'} size={'l'}>
                        IP-address
                    </Text>
                    <Text view={'secondary'} size={'l'}>
                        Location
                    </Text>
                    <Text view={'secondary'} size={'l'}>Ping</Text>
                    <Text view={'secondary'} size={'l'}>Upload speed</Text>
                    <Text view={'secondary'} size={'l'}>Download speed</Text>
                </div>
                <div className={cl.textWrapper}>
                    <Text view={'primary'} size={'l'}>
                        {ipInfo?.ip || '-'}
                    </Text>
                    <Text view={'primary'} size={'l'}>
                        {ipInfo?.country ?? '-'}, {ipInfo?.city ?? '-'}
                    </Text>
                    <Text view={'primary'} size={'l'}>
                        {ping !== undefined ? `${ping} ms` : '-'}
                    </Text>
                    {txProgress ? (
                        <ProgressLine value={txProgress} className={cl.progress}/>
                    ) : (
                        <Text view={tx ? (tx > 1 ? 'success' : 'alert') : 'primary'} size={'l'}>
                            {tx !== undefined ? `${tx} Mbit/s` : '-'}
                        </Text>
                    )}

                    {rxProgress ? (
                        <ProgressLine value={rxProgress} className={cl.progress}/>
                    ) : (
                        <Text view={rx ? (rx > 1 ? 'success' : 'alert') : 'primary'} size={'l'}>
                            {rx !== undefined ? `${rx} Mbit/s` : '-'}
                        </Text>
                    )}
                </div>
            </div>
            <div className={cl.buttonWrapper}>
                <Button
                    iconLeft={IconPlay}
                    size={'l'}
                    view={'primary'}
                    label={'Check'}
                    disabled={isLoading}
                    onClick={() => setIsLoading(true)}
                />
            </div>
        </div>
    )
}

export default NetworkSettings
