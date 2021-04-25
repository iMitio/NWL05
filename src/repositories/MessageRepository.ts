import {EntityRepository ,Repository} from "typeorm"
import { Message} from "../entities/Messages"

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {

}