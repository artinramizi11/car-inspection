import * as dotenv from "dotenv"
dotenv.config()

export default () => ({
    dbUrl: process.env.DB_URL,
    jwt_secret_key: process.env.JWT_SECRET_KEY
})