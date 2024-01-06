import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { print } from "graphql";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function mergeSchemas() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const loadedFiles = loadFilesSync(`${__dirname}/**/*.graphql`);
  const typeDefs = mergeTypeDefs(loadedFiles);
  const printedTypeDefs = print(typeDefs);
  fs.writeFileSync("mergedSchema.graphql", printedTypeDefs);
  return typeDefs;
}

export default mergeSchemas;
