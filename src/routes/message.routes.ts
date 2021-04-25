import {Router} from "express"
import {MessagesController} from "../controllers/Messagers/MessagesController"

const messageRoutes = Router();
const messageController = new MessagesController()

messageRoutes.post("/",  messageController.create);

messageRoutes.get("/:id", messageController.showByUser);
export{ messageRoutes}