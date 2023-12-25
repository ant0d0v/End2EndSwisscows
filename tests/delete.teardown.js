import { test as teardown } from "@playwright/test";
import { promisify } from "util";
import deleteAuthDirectory from "rimraf";

const authFile = "./data/auth";
const rimrafAsync = promisify(deleteAuthDirectory);

teardown(`Delete file with cookie ${authFile}`, async () => {
  try {
    await rimrafAsync(authFile);
    console.log(`Deleted ${authFile} successfully.`);
  } catch (error) {
    console.error(`Error deleting ${authFile}: ${error.message}`);
  }
});
