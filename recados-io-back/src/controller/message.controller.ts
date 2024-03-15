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
    
    async post(req: Request, res: Response) {
        // const {author, date, text, type} = req.body;
        // const newMessage: MessageInterface = {
        //     author,
        //     date: new Date(date),
        //     text,
        //     type
        // }

        const mockMessage:MessageInterface = {
            author: 'Rafael',
            date: new Date(),
            text: 'Recado salvo no banco',
            type: 'danger'
        }

        const message = await Message.create(mockMessage);
        await message.save();

        return res.send(message);
    },

    // update(req: Request, res: Response){
    //     return res.send({message: 'update'});
    // },

    async delete(req: Request, res: Response){
        const {id} = req.params;
        const message = await Message.findById(id);

        if(!message){
            return res.status(404).send({message: 'Não encontrado'})
        }

        await Message.findByIdAndDelete(id);
        return res.send({message: 'Delete'});
    }
}