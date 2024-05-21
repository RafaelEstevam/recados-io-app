import {Router, Request, Response} from 'express';
import MessageController from './controller/message.controller';
// import GPTController from './controller/gpt.controller';

import { pusher } from './pusher';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.send({message: 'Hello world' })
});

routes.post('/pusher/auth', (req: Request, res: Response) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authorizeChannel(socketId, channel);
    res.send(auth);
});

routes.get('/messages/all', MessageController.getAll);
routes.get('/messages/message/:id', MessageController.getMessageById);
routes.post('/messages/all', MessageController.getAllByChannelId);
routes.post('/messages/new', MessageController.post);
routes.delete('/messages/delete/:id', MessageController.delete);

// routes.post('/gpt', GPTController.post);

export {routes};