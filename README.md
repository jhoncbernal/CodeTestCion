# CodeTestCion


## Context

- Create a Docerized instance of this database. Write the SQL and a dockerfile to launch the DB, and create the tables required. 

Write a node JS script that inserts 2 users into the database, and creates 2 messages between the users. Then query the database and retreive the information on the 2 users and their chat history. Log this data to the node console.

## Related Links 

- Sample of a Postgres DB schema:   https://drawsql.app/stingray/diagrams/cion-backend-interview# .

## Screenshots
### PgAdmin Configuration
![image](https://user-images.githubusercontent.com/27929182/119171893-d03d4080-ba2a-11eb-9b86-acdc7bb6dd87.png)
### Node js log 
![image](https://user-images.githubusercontent.com/27929182/119170384-cadef680-ba28-11eb-96ea-eb1846154010.png)
### DB data 
* ![image](https://user-images.githubusercontent.com/27929182/119170606-1beeea80-ba29-11eb-83da-b78542b507a8.png)
* ![image](https://user-images.githubusercontent.com/27929182/119170649-2c06ca00-ba29-11eb-8b14-e605979d2520.png)

## Manual Testing Steps

* Please Run the application with this command: `docker-compose -f "docker-compose.yml" up -d --build`
* Go to http://localhost:8080/
* Login with the credentials : email: cionTest@cion.com password: secret
* Click on Add New Server and name it
* Go to connection tab into the field host : `your local ip or localhost`, username: `postgres` and password : `newPassword`
* Go to Databases, cion-db, Schemas, public, tables and there are 2 tables messages and users 
* Create 2 new queries:
* 
-`SELECT message_id, from_user, to_user, date, body
	FROM public.messages;`
  
-`SELECT user_id, display_name, email
	FROM public.users;`
  
* Also you can enter to the coinainer log cion-code-test and check the log 

## Readiness Checklist

- [X] Self-review code changes
- [X] Add or update tests
- [X] Ensure tests pass locally
