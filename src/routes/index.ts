import express from 'express';
import User from '../models/user';
import Conversation from '../models/converstaion';
const router = express.Router();

router.post('/user', async(req, res) => {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            conversationId: req.body.conversationId,
        });
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
});

router.post('/conversation/:conversationId', async(req, res) => {
    try {
        const conversationId = req.params.conversationId;
        console.log(req.body);
        console.log(conversationId);
        const convo = await Conversation.findOne(
            { _id: conversationId },
          );

          console.log("------->result",convo);
        if (!convo) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        const msg = {
            author:{
                firstName: req.body.author.firstName,
                type: req.body.author.type
            },
            content: req.body.content,
            type: req.body.type
        }
        console.log("------->msg",msg);
        convo.messages.push({
            author:{
                firstName: req.body.author.firstName,
                type: req.body.author.type
            },
            content: req.body.content,
            type: req.body.type
        });
        await convo.save();
        console.log("------->result",convo);
        return res.status(200).json({ message: 'Message added successfully' });

    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
})

router.post('/conversation', async(req, res) => {
    try {
        const resp = await Conversation.create({
            messages: [
              {
                author: {
                    firstName: "Server",
                    type: "bot"
                },
                content: "Message BOT",
                type: "text"
              }
            ]
        });
        return res.status(201).json({ message: 'Conversation created successfully', conversationId: resp._id });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
})


export default router;