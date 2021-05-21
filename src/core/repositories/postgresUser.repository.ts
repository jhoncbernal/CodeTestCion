import User from '../entities/user';

interface PostgresUserRepository {
  getUsers(): Promise<User[]>;
  getUserById(id:number): Promise<User>;
  insertUser(displayName:string,email:string): Promise<User>;
  deleteDataTableUsers():Promise<boolean>;
}
export default PostgresUserRepository;