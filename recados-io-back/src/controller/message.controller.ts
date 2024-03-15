import {Request, Response} from 'express';
import Message from '../schema/message.schema';
import { MessageInterface } from '../interface/message.interface';

export default {
    get(req: Request, res: Response){
        return res.send({message: 'get'})
    },

    getAll(req: Request, res: Response){
        return res.send({message: 'getall'})
    },
    
    post(req: Request, res: Response) {
        // const {author, date, text, type} = req.body;
        // const newMessage: MessageInterface = {
        //     author,
        //     date: new Date(date),
        //     text,
        //     type
        // }

        // const mockMessage:MessageInterface = {
        //     author: 'Rafael',
        //     date: new Date(),
        //     text: 'Recado salvo no banco',
        //     type: 'danger'
        // }

        // const message = await Message.create(mockMessage);

        // console.log(mockMessage);

        // await message.save();
        // res.status(200).json(message);

        return res.send({message: 'post'});
    },

    update(req: Request, res: Response){
        return res.send({message: 'update'});
    },

    delete(req: Request, res: Response){
        return res.send({message: 'delete'});
    }
}