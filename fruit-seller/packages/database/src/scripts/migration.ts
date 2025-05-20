import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { client } from "../database";

async function main() {
	try {
		await migrate(drizzle(client), { migrationsFolder: "drizzle" });
		console.log("Migration completed");
	} catch (error) {
		console.error("Error during migration:", error);
		process.exit(1);
	}
}

main();
