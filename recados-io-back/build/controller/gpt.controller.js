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
const gpt_1 = __importDefault(require("../config/gpt"));
exports.default = {
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message } = req.body;
            const data = {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: `Corriga somente a ortografia da seguinte sentença: ${message.replace(/(\r\n|\n|\r)/gm, " ")}. Sem alterar o sentido da frase.` }
                ],
                max_tokens: 56,
                temperature: 0.5
            };
            try {
                const gptResponse = yield gpt_1.default.post('/chat/completions', data);
                return res.json(gptResponse.data).status(200);
            }
            catch (e) {
                console.log(e);
                return res.status(400).send(e);
            }
            ;
        });
    },
};
