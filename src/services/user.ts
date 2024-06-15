import UserRepository from "../repositories/user";

class UserService {
  async getUserById(id: string) {
    return await UserRepository.getUserById(id);
  }

  async updateConversation(conversationId: string, message: any) {
    return await UserRepository.updateConversation(conversationId, message);
  }
}