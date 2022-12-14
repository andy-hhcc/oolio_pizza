export default (...params: any) => {
    if (process.env.LOG_DETAILS !== 'disabled') {
        console.log(...params)
    }
}