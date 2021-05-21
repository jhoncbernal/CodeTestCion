import PostgresMessageRepository from "../core/repositories/postgresMessage.repository";
import Message from "../core/entities/message";
import pool from "../dbconfig/dbconnector";
class PostgresMessage implements PostgresMessageRepository {

  public async sendMessage(fromUser:number,toUser:number,body:string): Promise<Message> {
    const message: Message =await this.executeQuery(`INSERT INTO messages (from_user,to_user,body) VALUES ('${fromUser}','${toUser}','${body}') RETURNING *`);
    return message;
  }
  public async readMessagesByUsers(user1:number,user2:number): Promise<Message[]>{
    const message: Message[] =await this.executeQuery(`SELECT * FROM messages 
    WHERE (from_user = ${user1} OR from_user = ${user2}) AND (to_user = ${user1} OR to_user = ${user2}) ORDER BY date`);
    return message;
  }
  private async executeQuery(query:string){
    const client = await pool.connect();
    return await new Promise<any>((resolve) => {
        client
          .query(query)
          .then((result) => {
            resolve(result.rows);
          })
          .catch((e) => console.error(e.stack))
          .then(() => client.end());
      });
  }
}
export default PostgresMessage;
