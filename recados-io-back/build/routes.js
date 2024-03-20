"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const message_controller_1 = __importDefault(require("./controller/message.controller"));
const pusher_1 = require("./pusher");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.get('/', (req, res) => {
    console.log(req);
    res.send({ message: 'Hello world' });
});
routes.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher_1.pusher.authorizeChannel(socketId, channel);
    res.send(auth);
});
routes.post('/new-message', (req, res) => {
    const message = req.body;
    pusher_1.pusher.trigger(message === null || message === void 0 ? void 0 : message.channel, "client-my-event", {
        message: message,
        type: 'message'
    });
    res.json({ message: 'Mensagem enviada' });
});
routes.get('/messages', message_controller_1.default.getAll);
routes.get('/messages/all/:channelId', message_controller_1.default.getAllByChannelId);
routes.get('/messages/message/:id', message_controller_1.default.get);
routes.post('/messages/new', message_controller_1.default.post);
// routes.get('/messages/edit/:id', MessageController.update);
routes.delete('/messages/delete/:id', message_controller_1.default.delete);
