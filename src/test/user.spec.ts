import { expect } from "chai";
import "mocha";
import Message from "../core/entities/message";
import PostgresMessage from "../dataSource/postgresMessage.datasoure";
import PostgresConsole from "../postgresConsole";

describe("Main Conversation", () => {
  it("insert conversation", async () => {
    const messages = [
      "Hey",
      "How are you Today?",
      "Awesome and you?",
      "Nothing new ",
    ];
    await new PostgresConsole().start(messages);
    const postgresMessage = new PostgresMessage();
    let value: string = messages[0];
    const result: Message[] = await postgresMessage.readMessagesByMessage(
      value
    );
    const checkItemsInclude = (arr, str) =>
      arr.some((message) => message.body === str);
    expect(checkItemsInclude(result, value)).to.be.equal(true);
  });
});
