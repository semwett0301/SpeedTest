export default function (instance) {
    return (buffer, onUploadProgress) => instance.post('/tx', buffer, {
        onUploadProgress: onUploadProgress,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Cache-Control': 'no-cache'
        }
    })
}
