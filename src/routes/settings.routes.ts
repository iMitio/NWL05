import {Router} from "express"
import {SettingController} from "../controllers/settings/SettingsController"

const settingsRoutes =  Router()
const settingsController = new SettingController();


settingsRoutes.post("/", settingsController.create )
settingsRoutes.get("/:username", settingsController.findByUsername)
settingsRoutes.put("/update/:username", settingsController.update)


export {settingsRoutes}