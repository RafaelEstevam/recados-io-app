import {Router, Request, Response} from 'express';
import MessageController from './controller/message.controller';
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

// routes.post('/new-message', (req, res) => {
//     const message = req.body;
    
//     pusher.trigger(message?.channel, "client-my-event", {
//         message: message,
//         type: 'message'
//     });
//     res.json({message: 'Mensagem enviada'});
// });

// routes.get('/messages', MessageController.getAll);
routes.patch('/messages/all', MessageController.getAllByChannelId);
// routes.get('/messages/message/:id', MessageController.get);

routes.post('/messages/new', MessageController.post);

// routes.get('/messages/edit/:id', MessageController.update);
routes.delete('/messages/delete/:id', MessageController.delete);

export {routes};