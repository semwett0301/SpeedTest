export default function (instance) {
    return () => instance.get("/ip")
}
