import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

// 确保环境变量中有 MY_DB
declare global {
  var MY_DB: D1Database;
}

export const db = drizzle(globalThis.MY_DB, { schema }); 