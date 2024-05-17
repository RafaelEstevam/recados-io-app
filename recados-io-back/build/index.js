"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const sendToHubspot_schedule_1 = require("./schedule/sendToHubspot.schedule");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(routes_1.routes);
mongoose_1.default.connect(process.env.MONGO_DB_URL || '').then((response) => {
    console.log('Mongo connected');
    (0, sendToHubspot_schedule_1.HubspotSchedules)();
}).catch((e) => {
    console.log(e);
});
app.listen(8888, () => {
    console.log("Server is open.");
});
