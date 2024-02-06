import { printSchema } from "graphql";
import { writeFileSync } from "fs";
import { join } from "path";
import schema from "@/graphql/schema";

const schemaPath = join(process.cwd(), "../client/src/graphql/schema.graphql");
writeFileSync(schemaPath, printSchema(schema), "utf-8");
