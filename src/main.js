import "dotenv/config"
import "./container.js"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { appRouter } from "#core/router.js"
import { errorMiddleware } from "#root/middleware/error.middleware.js"

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(errorMiddleware)
app.use(appRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port:", process.env.PORT || 3000)
})