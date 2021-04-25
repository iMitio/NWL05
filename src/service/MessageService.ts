import {Repository , getCustomRepository} from "typeorm"
import {MessageRepository} from "../repositories/MessageRepository"
import {Message} from "../entities/Messages"

interface MessageCreate{
    admin_id?: string;
    user_id: string;
    text: string;
}

export class MessageService {
    //Para nao deixa instacia toda vez que foi chamar uma funcao 
    private  messageRepository: Repository<Message>
    constructor() {
        this.messageRepository = getCustomRepository(MessageRepository);
    }

 async create({admin_id,user_id, text}: MessageCreate)      {
     

     const message = await this.messageRepository.create({admin_id,user_id, text})
     await this.messageRepository.save(message)
     return message
 }

 async listByUser(user_id: string) {
    const list = await this.messageRepository.find({
        where: {user_id},
        relations: ["user"]
    })

    return list
 }
}