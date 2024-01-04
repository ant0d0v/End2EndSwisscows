import { test as teardown } from "@playwright/test";
const rimraf = require("rimraf");
const authFile = "./data/auth";

teardown("Delete file after test run", async () => {
  try {
    rimraf.sync(authFile);;
  } catch (error) {
    console.error("Error deleting file:", error);
  }
});
