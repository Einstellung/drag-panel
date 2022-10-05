import exress from "express"
import cors from "cors"
import { router } from "./router"

const app = exress()
app.use(exress.json())
app.use(cors())
router(app)
console.log("listen port 4003")
app.listen(4003)
