import Message from "./core/entities/message";
import User from "./core/entities/user";
import PostgresMessage from "./dataSource/postgresMessage.datasoure";
import PostgresUser from "./dataSource/postgresUser.datasource";

class PostgresConsole {
  private _postgresUser: PostgresUser;
  private _postgresMessage: PostgresMessage;
  private user1: User;
  private user2: User;
  constructor() {
    this._postgresUser = new PostgresUser();
    this._postgresMessage = new PostgresMessage();
  }
  private async deletePreviusData() {
    await this._postgresMessage.deleteDataTableMessages();
    await this._postgresUser.deleteDataTableUsers();
  }
  private async insertUsers() {
    this.user1 = await this._postgresUser.insertUser(
      "Test 1",
      `test${Math.random().toString()}@gmail.com`
    );
    this.user2 = await this._postgresUser.insertUser(
      "Test 2",
      `test2${Math.random().toString()}@gmail.com`
    );
  }

  private async startConversation(messages: string[]) {
    let startConversation: boolean = true;
    await Promise.all(
      messages.map(async (message: string): Promise<Message> => {
        const userId1: number = startConversation
          ? this.user1.user_id
          : this.user2.user_id;
        const userId2: number = startConversation
          ? this.user2.user_id
          : this.user1.user_id;
       
        startConversation = false;
       return await this._postgresMessage.sendMessage(userId1, userId2, message);
      })
    );
  }

  private async consoleConversation() {
    const messages: Message[] = await this._postgresMessage.readMessagesByUsers(
      this.user1.user_id,
      this.user2.user_id
    );
    let users: User[] = [this.user1, this.user2];
    const chatConsole = messages.map( (message: Message) => {
      const user: User = users.find(
        (user: User) => user.user_id == message.from_user
      );
      return `${user.display_name}: ${message.body}`;
    });

    console.log("Chat Conversation :",chatConsole);
  }

  public async start(messages: string[]) {
    await this.deletePreviusData();
    await this.insertUsers();
    await this.startConversation(messages);
    await this.consoleConversation();
  }
}

export default PostgresConsole;
