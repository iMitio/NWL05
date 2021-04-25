import {Repository ,getCustomRepository} from  "typeorm"
import {SettingsRepository} from  "../repositories/SettingsRepository"

import {Settings} from "../entities/Settings"

interface ISettingsCreate {
    username: string;
    chat: boolean;
}

export class SettingsService {
     //Para nao deixa instacia toda vez que foi chamar uma funcao 
    private settingsRepository : Repository<Settings>
    constructor(){
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({username, chat}: ISettingsCreate) {
       

        const userAlreadyExists = await this.settingsRepository.findOne({username})

        if(userAlreadyExists) {
            throw new Error( "This username already exists")
        }

        const settings =  this.settingsRepository.create({username, chat})
        await this.settingsRepository.save(settings)
    
     }

     async findByUsername (username: string) {
         const settings = await this.settingsRepository.findOne({username})

         return settings

     }

     async update (chat: boolean, username: string) {
         await this.settingsRepository.createQueryBuilder()
        .update(Settings)
        .set({chat})
        .where("username = :username", 
        {username})
        .execute()
    }
}