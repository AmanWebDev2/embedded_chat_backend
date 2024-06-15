import { models } from "../models/index";
const { User } = models;

class UserRepository {
  static async getUserById(id: string) {
    return await User.findById(id);
    }

    static async updateConversation(conversationId: string, message: any) {
        try {
            const conversation = await User.findOne({
                'conversations.conversationId': conversationId
              });
              if(!conversation){
                throw new Error('Conversation not found');
              }
                const resp = await User.findOneAndUpdate(
                    {  "conversations.conversationId": conversationId },
                    {
                      $push: {
                        messages: {
                          ...message
                        },
                      },
                    },
                )
                return resp;  
        } catch (error) {
            return error;
        }
              
    }
}

export default UserRepository;