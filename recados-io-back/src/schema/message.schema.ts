import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSquema = new Schema({
    text: String,
    author: String,
    type: String,
    date: Date,
});

export default mongoose.model('Messages', MessageSquema)

