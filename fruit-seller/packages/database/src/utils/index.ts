import { type SQL, sql } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";

export const getEnvVar = (name: string): string => {
	// const value = process.env[name];
	// console.log(process.env);
	// if (!value) {
	// 	throw new Error(`Missing environment variable: ${name}`);
	// }
	// return value;
	return "postgresql://postgres:xnve4729@localhost:5432/postgres";
};

export function getISOFormatDateQuery(dateTimeColumn: PgColumn): SQL<string> {
	return sql<string>`to_char(${dateTimeColumn}, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`;
}
