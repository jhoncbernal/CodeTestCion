import Message from '../entities/message';

interface PostgresMessageRepository {
  sendMessage(fromUser:number,toUser:number,body:string): Promise<Message>;
  readMessagesByUsers(user1:number,user2:number): Promise<Message[]>;
  readMessagesByMessage(message:string): Promise<Message[]>;
  deleteDataTableMessages():Promise<boolean>;
}
export default PostgresMessageRepository;