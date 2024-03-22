"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_schema_1 = __importDefault(require("../schema/message.schema"));
exports.default = {
    get(req, res) {
        return res.send({ message: 'get' });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield message_schema_1.default.find();
            return res.json(messages);
        });
    },
    getAllByChannelId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { channel, type } = req.body;
            let query = { channel };
            if (type !== 'undefined' && type !== '') {
                query = Object.assign(Object.assign({}, query), { type });
            }
            const messages = yield message_schema_1.default.find(query);
            return res.json(messages);
        });
    },
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { author, channel, text, type } = req.body;
            const newMessage = {
                author,
                date: new Date(),
                text,
                type,
                channel
            };
            const message = yield message_schema_1.default.create(newMessage);
            yield message.save();
            return res.send(message);
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const message = yield message_schema_1.default.findById(id);
            if (!message) {
                return res.status(404).send({ message: 'Não encontrado' });
            }
            yield message_schema_1.default.findByIdAndDelete(id);
            return res.send({ message: 'Delete' });
        });
    }
};
