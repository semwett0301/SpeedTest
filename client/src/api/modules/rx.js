export default function (instance) {
    return (onUploadProgress, controller) => instance.post(
        '/rx',
        {},
        {
            onDownloadProgress: onUploadProgress,
            headers: { 'Cache-Control': 'no-cache' },
        }
    )
}
