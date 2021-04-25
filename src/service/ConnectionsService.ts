import {Repository, getCustomRepository} from "typeorm"
import {ConnectionsRepository} from "../repositories/ConnectionsRepository"
import {Connections} from "../entities/Connections"
interface IConnectionsCreate {
    user_id:  string;
    socket_id: string;
    admin_id?: string;
    id?: string;
}

export class ConnectionsService {
    private connectionsRepository:  Repository<Connections>
    
    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository)
    }
    async create({socket_id,user_id,admin_id,id}: IConnectionsCreate) {
        const connection = this.connectionsRepository.create({socket_id,user_id,admin_id,id})

        await this.connectionsRepository.save(connection)

        return connection
    }

    async findByUserId(user_id:string) {
        const connectionUserId =  await  this.connectionsRepository.findOne({user_id})

        return  connectionUserId
    }

    async findAllWithoutAdmin () {
        const connections = await this.connectionsRepository.find({
            where: {admin_id:  null},
            relations: ['user']
        })

        return connections
    }

    async findBySocketId(socket_id:string) {
        const connection = await this.connectionsRepository.findOne({socket_id})
        return connection;
    }

    async updateadmin (user_id: string, admin_id: string) {
        await this.connectionsRepository.createQueryBuilder()
       .update(Connections)
       .set({admin_id})
       .where("user_id = :user_id", 
       {user_id})
       .execute()
   }
}