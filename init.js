const mongoose = require("mongoose");
const Chat = require("./model/chat.js");



main().then(() => {
    console.log("connection susseccful");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}




let allChats = [
    {
        from: "Neha",
        to: "Priya",
        msg: "Send ur resume",
        created_at: new Date()
    },
    {
        from: "Mohit",
        to: "Neha",
        msg: "Where are you?",
        created_at: new Date()
    },
    {
        from: "Rohan",
        to: "Mohit",
        msg: "Give my money back",
        created_at: new Date()
    },
    {
        from: "Priya",
        to: "Neha",
        msg: "You are selected",
        created_at: new Date()
    },
    {
        from: "Rohan",
        to: "Mohit",
        msg: "100 rs Prapt hue",
        created_at: new Date()
    },
]


Chat.insertMany(allChats)