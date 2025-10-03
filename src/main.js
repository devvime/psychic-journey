import "dotenv/config"
import "./container.js"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { appRouter } from "#core/router.js"

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(appRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port:", process.env.PORT || 3000)
})