import PostgresUserRepository from "../core/repositories/postgresUser.repository";
import User from "../core/entities/user";
import pool from "../dbconfig/dbconnector";
class PostgresUser implements PostgresUserRepository {
  public async deleteDataTableUsers(): Promise<boolean> {
    await this.executeQuery(`DELETE FROM users RETURNING *;`);
    return true;
  }
  public async getUsers(): Promise<User[]> {
    const users: User[] = await this.executeQuery("SELECT * FROM users");
    return users;
  }
  public async getUserById(id: number): Promise<User> {
    const user: User = await this.executeQuery(
      `SELECT * FROM users WHERE user_id=${id}`
    );
    return user[0];
  }
  public async insertUser(displayName: string, email: string): Promise<User> {
    const users: User = await this.executeQuery(
      `INSERT INTO users (display_name,email) VALUES ('${displayName}','${email}') RETURNING *`
    );
    return users[0];
  }

  private async executeQuery(query: string) {
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
export default PostgresUser;
