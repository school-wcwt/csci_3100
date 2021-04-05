const accessSecret = process.env.JWT_ACCESS_SECRET
const refreshSecret = process.env.JWT_REFRESH_SECRET
const backendPort = process.env.BACKEND_PORT

module.exports = {
    accessSecret,
    refreshSecret,
    backendPort
}