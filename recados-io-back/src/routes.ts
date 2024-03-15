import {Router, Request, Response} from 'express';
import MessageController from './controller/message.controller';
// import { pusher } from './pusher';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    console.log(req);
    res.send({message: 'Hello world' })
});

routes.get('/board/:channelName', (req: Request, res: Response) => {
    const {channelName} = req.params;
    res.status(200).json({channelName})
})

routes.post('/pusher/auth', (req: Request, res: Response) => {
    console.log('pusher');
});

routes.get('/messages', MessageController.getAll);
routes.get('/messages/message/:id', MessageController.get);
routes.get('/messages/new', MessageController.post);
// routes.get('/messages/edit/:id', MessageController.update);
routes.get('/messages/delete/:id', MessageController.delete);

export {routes};