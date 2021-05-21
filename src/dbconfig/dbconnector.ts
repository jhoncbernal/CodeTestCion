import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:newPassword@postgres:5432/cion-db',
    idleTimeoutMillis: 30000,
/*     host: 'localhost',
    user: 'postgres',
    database: 'cion-db',
    password: 'newPassword',
    port: 5432  */
});