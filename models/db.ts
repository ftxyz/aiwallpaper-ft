import { Pool } from "pg";

let globalPool: Pool;
export function getDb() {
    if (!globalPool) {
        globalPool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }
    return globalPool;
}