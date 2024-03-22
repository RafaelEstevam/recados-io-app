"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusher = void 0;
const pusher_1 = __importDefault(require("pusher"));
const pusher = new pusher_1.default({
    appId: '1769831',
    key: process.env.PUSHER_CONNECTION_KEY || '',
    secret: process.env.PUSHER_CONNECTION_SECRET || '',
    cluster: 'us2',
    useTLS: true
});
exports.pusher = pusher;
