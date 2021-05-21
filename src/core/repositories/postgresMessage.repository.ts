import Message from '../entities/message';

interface PostgresMessageRepository {
  sendMessage(fromUser:number,toUser:number,body:string): Promise<Message>;
  readMessagesByUsers(user1:number,user2:number): Promise<Message[]>;
}
export default PostgresMessageRepository;