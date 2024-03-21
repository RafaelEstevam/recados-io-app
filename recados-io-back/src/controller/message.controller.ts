import {Request, Response} from 'express';
import Message from '../schema/message.schema';
import { MessageInterface } from '../interface/message.interface';

export default {
    get(req: Request, res: Response){
        return res.send({message: 'get'})
    },

    async getAll(req: Request, res: Response){
        const messages = await Message.find();
        return res.json(messages)
    },

    async getAllByChannelId(req: Request, res: Response){
        const {channel, type} = req.body;
        let query = {channel};

        if(type !== 'undefined' && type !== ''){
            query = {...query, ...{type}}
        }

        const messages = await Message.find(query);

        return res.json(messages)
    },
    
    async post(req: Request, res: Response) {

        const {author, channel, text, type} = req.body;

        const newMessage: MessageInterface = {
            author,
            date: new Date(),
            text,
            type,
            channel
        }

        const message = await Message.create(newMessage);
        await message.save();

        return res.send(message);
    },

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