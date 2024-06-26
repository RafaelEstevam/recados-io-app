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
const log_schema_1 = __importDefault(require("../schema/log.schema"));
exports.default = {
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newLog = {
                body: JSON.stringify(req.body),
                ip: req.ip,
                headers: JSON.stringify(req.headers),
                date: new Date()
            };
            const log = yield log_schema_1.default.create(newLog);
            yield log.save();
            return res.send(newLog);
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield log_schema_1.default.find();
            return res.json(logs);
        });
    }
};
