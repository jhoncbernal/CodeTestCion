import PostgresConsole from "./postgresConsole";
const messages = [
  "Hey",
  "How are you Today?",
  "Awesome and you?",
  "Nothing new ",
];
const starter = new PostgresConsole()
  .start(messages)
  .then(() => console.log(`Running`))
  .catch((error) => {
    console.log(error);
  });

export default starter;
