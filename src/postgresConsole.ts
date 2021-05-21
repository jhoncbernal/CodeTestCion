import Message from "./core/entities/message";
import User from "./core/entities/user";
import PostgresMessage from "./dataSource/postgresMessage.datasoure";
import PostgresUser from "./dataSource/postgresUser.datasource";

class PostgresConsole {
  private _postgresUser: PostgresUser;
  private _postgresMessage: PostgresMessage;

  constructor() {
    this._postgresUser = new PostgresUser();
    this._postgresMessage = new PostgresMessage();
  }

  private async insertUsers() {
    await this._postgresUser.insertUser("Test 1", "test11@gmail.com");
    await this._postgresUser.insertUser("Test 2", "test22@gmail.com");
  }

  private async startConversation() {
    await this._postgresMessage.sendMessage(1, 2, "Hey");
    await this._postgresMessage.sendMessage(2, 1, "How are you Today?");
    await this._postgresMessage.sendMessage(1, 2, "Awesome and you?");
    await this._postgresMessage.sendMessage(2, 1, "Nothing new ");
  }

  private async consoleConversation() {
    const messages: Message[] = await this._postgresMessage.readMessagesByUsers(
      1,
      2
    );
    const chatConsole = await Promise.all(
      messages.map(async (message: Message) => {
        const user:User = await this._postgresUser.getUserById(message.from_user);
        return `${user.display_name}: ${message.body}`;
      })
    );

    console.log(chatConsole);
  }

  public async start() {
    await this.insertUsers();
    await this.startConversation();
    await this.consoleConversation();
  }
}

export default PostgresConsole;
