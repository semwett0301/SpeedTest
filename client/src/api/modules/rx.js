export default function (instance) {
    return (onUploadProgress) => instance.post(
        '/rx',
        {},
        {
            onDownloadProgress: onUploadProgress,
            headers: { 'Cache-Control': 'no-cache' },
        }
    )
}
