import {Request, Response} from "express"
import {UserService} from "../../service/UserService"

export class UserController {
  async  create(request: Request, response: Response) {
    try {
        const {email}  = request.body
        const userService = new UserService()
        const user = await userService.create(email)
        
        return response.status(201).json(user)
    } catch (err) {
        return response.status(400).json({error: err.message})
    }
  }
}