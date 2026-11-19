import { MongoMemoryServer } from "mongodb-memory-server";
import type { TestProject } from "vitest/node";

declare module "vitest" {
  export interface ProvidedContext {
    mongoUri: string;
  }
}

export default async function setup({ provide }: TestProject) {
  const mongod = await MongoMemoryServer.create();
  provide("mongoUri", mongod.getUri());

  return () => mongod.stop();
}
