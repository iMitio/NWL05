import {Request, Response} from "express"

import {SettingsService} from  "../../service/SettingsService"

export class SettingController {
 async create(request: Request, response: Response) {
    try {
      const {username, chat} = request.body
      const settingsService = new SettingsService();
  
      const settings = await settingsService.create({username, chat})
  
      return response.json(settings)
    } catch (err) {
       return response.status(400).json({error: err.message})
    }
 }

 async findByUsername(request:Request, response: Response) {
   const {username} = request.params

   const settingsService = new SettingsService();
   const settings = await settingsService.findByUsername(username)
   return response.json(settings)
 }

 async update (request: Request, response: Response) {
   const {username} = request.params
   const {chat} = request.body
   const settingsService = new SettingsService();
   const  settings = await  settingsService.update(chat, username)
   return response.json(settings)


 }
}