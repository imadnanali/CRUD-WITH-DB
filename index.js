const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const Chat = require("./model/chat.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"))

app.use(express.urlencoded({ extended: true }));

main().then(() => {
    console.log("connection susseccful");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


// Index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats })
})

// New Route
app.get("/chats/new", (req, res) => {
    res.render("new")
})

// Create Route
app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    })
    res.redirect("/chats")
    newChat.save()
        .then(res => { console.log(res) })
        .catch(err => {
            console.log(err);
        })

})


// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
})

// Update route
app.put("/chats/:id", async (req, res)=>{
    let { id } = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg}, {runValidators: true, new: true})
    res.redirect("/chats")
})

// Delete Chat
app.delete("/chats/:id", async (req, res)=>{
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats")
})

app.get("/", (req, res) => {
    res.send(`<h1>App is working</h1>`);
})

app.listen(8080, () => {
    console.log(`App listening at port 8080`);
})
