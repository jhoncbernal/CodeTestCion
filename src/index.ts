import PostgresConsole from './postgresConsole';

const starter =new PostgresConsole().start()
.then(() => console.log(`Running`))
.catch(error => {
  console.log(error)
});;

export default starter;
