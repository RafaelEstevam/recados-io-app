"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubspotSchedules = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const HubspotSchedules = () => {
    const hubspotSchedule = node_cron_1.default.schedule('* * * * * *', () => {
        console.log("chamou hubspot", new Date());
    }, {
        timezone: 'America/Sao_Paulo',
        scheduled: false,
    });
    hubspotSchedule.start();
};
exports.HubspotSchedules = HubspotSchedules;
