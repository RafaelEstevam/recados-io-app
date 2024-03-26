"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const message_controller_1 = __importDefault(require("./controller/message.controller"));
// import GPTController from './controller/gpt.controller';
const pusher_1 = require("./pusher");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.get('/', (req, res) => {
    res.send({ message: 'Hello world' });
});
routes.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher_1.pusher.authorizeChannel(socketId, channel);
    res.send(auth);
});
routes.get('/messages/all', message_controller_1.default.getAll);
routes.post('/messages/all', message_controller_1.default.getAllByChannelId);
routes.post('/messages/new', message_controller_1.default.post);
routes.delete('/messages/delete/:id', message_controller_1.default.delete);
