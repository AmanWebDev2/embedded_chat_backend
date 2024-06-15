import { Server, Socket } from 'socket.io';
import User from '../../models/user';
import Conversation from '../../models/converstaion';
export default function initializeSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected', socket.id);


    socket.on('message', async(message, conversationId) => {
      console.log('Received message:', message);
      io.emit('receive-message', {
        author: {
          firstName: 'Server',
          type: 'bot',
        },
        content: `Message BOT`,
        type: 'text',
      });

      // check if conversation exists
      // if not create new conversation
      // if yes, save message to conversation
      const conversation = await Conversation.findOne({ "conversationId": conversationId });
      console.log('conversation:', conversation);
      if (!conversation) {
        console.log('Creating new user with conversationId: ', conversationId);
        const resp = await Conversation.create({
          conversationId: conversationId,
          messages: [
            {
              author: {
                firstName: message.author.firstName,
                type: message.author.type,
              },
              content: message.content,
              type: message.type,
            }
          ]
        })
        await User.create({
          name: 'Test',
          email: 'test@test.com',
          password: 'test',
          conversationId: resp._id,
      });
      }else{
        console.log('User already exists with conversationId: ', conversationId); 
        // get the user with conversation id
        const convo = await Conversation.findOne(
          { "conversationId": conversationId },
        );

        if (!convo) {
          throw new Error('Conversation not found');
      }

      const msg = {
          author:{
              firstName: message.author.firstName,
              type: message.author.type
          },
          content: message.content,
          type: message.type
      }
      console.log("------->msg",msg);
      convo.messages.push({
          author:{
              firstName: message.author.firstName,
              type: message.author.type
          },
          content: message.content,
          type: message.type
      });
      await convo.save();
      }
    });

    // socket.emit('message', { from: 'Server', text: `Welcome to the chat ${socket.id}` });
    // socket.broadcast.emit('welcome', { from: 'Server', text: `New user joined the chat ${socket.id}` });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}
