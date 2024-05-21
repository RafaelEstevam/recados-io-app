import {Request, Response} from 'express';
import Log from '../schema/log.schema';

export default {
  async post(req: Request, res: Response) {
    const newLog = {
      body: JSON.stringify(req.body),
      ip: req.ip,
      headers: JSON.stringify(req.headers),
      date: new Date()
    }
    const log = await Log.create(newLog);
    await log.save();
    return res.send(newLog);
  },

  async getAll(req: Request, res: Response){
    const logs = await Log.find();
    return res.json(logs)
  }
}