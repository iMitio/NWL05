import {Repository,getCustomRepository} from  "typeorm"
import {UserRepository} from "../repositories/UserRepository"

import {User} from "../entities/User"

export class UserService  {
    //Para nao deixa instacia toda vez que foi chamar uma funcao 
    private userRepository : Repository<User>
    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
    }
    async create(email: string) {
    
        const userExists = await this.userRepository.findOne({email})

        if(userExists) {
            return userExists
        }
        const user  =  this.userRepository.create({email})
        await  this.userRepository.save(user)

        return user

    }


    async  findByEmail(email: string) {
        const userEmail =  this.userRepository.findOne({email}) 
       
        return userEmail
    }

    async  fidnByUser(user_id: string) {
        const user =  this.userRepository.findOne({id: user_id}) 
       
        return user
    }
}