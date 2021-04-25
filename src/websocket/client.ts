import {io} from "../http"
import {ConnectionsService} from "../service/ConnectionsService"
import {UserService}  from  "../service/UserService"
import {MessageService} from "../service/MessageService"

interface IParams {
    text: string;
    email: string
}

io.on("connect", (socket) => {
    const connectionService = new ConnectionsService()
    const userService = new UserService()
    let menssageService = new MessageService()

    socket.on("client_first_access", async params => {
        const socket_id = socket.id
        const {text, email} = params as IParams
        let user_id = null

        const userAleadyExists = await userService.findByEmail(email)

        if(!userAleadyExists) {
            const  user =  await userService.create(email)
            await connectionService.create({
                socket_id,
                user_id: user.id
            });
            user_id= user.id
        }else {
            user_id = userAleadyExists.id
            const connection = await connectionService.findByUserId(userAleadyExists.id)

            if(!connection) {
                await connectionService.create({
                    socket_id,
                    user_id: userAleadyExists.id
                })
                
            }else {
                connection.socket_id = socket_id;
                await connectionService.create(connection)
            }
        }
        await menssageService.create({
            text,
            user_id
        })

        const  allMessages = await menssageService.listByUser(user_id)

        socket.emit("client_list_all_messages", allMessages) 
        const allUsers = await connectionService.findAllWithoutAdmin();
        io.emit("admin_list_all_users", allUsers)
    })

    socket.on("client_send_to_admin", async(params) => {
        const {text, socket_admin_id } = params;
        const socket_id = socket.id;

        const  { user_id } = await connectionService.findBySocketId(socket_id)
        const message = await menssageService.create({
            text,
            user_id
        })
        const {email} = await userService.fidnByUser(user_id)
        io.to(socket_admin_id).emit("admin_receive_message", {
            email,
            message,
            socket_id,
        })
    })
})