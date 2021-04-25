import {Router} from "express"

import {userRoutes} from  "../routes/user.routes"
import {settingsRoutes} from  "../routes/settings.routes"
import {messageRoutes} from "../routes/message.routes"

const routes = Router();
routes.use("/settings", settingsRoutes)
routes.use("/users", userRoutes)
routes.use("/messages", messageRoutes)

export { routes}