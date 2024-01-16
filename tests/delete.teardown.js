import { test as teardown } from "@playwright/test";
const rimraf = require("rimraf");
const authFile = "./data/auth";
const downloadFile = "./tests/download";

teardown("Delete file after test run", async () => {
  try {
    rimraf.sync(authFile);
    rimraf.sync(downloadFile);;
  } catch (error) {
    console.error("Error deleting file:", error);
  }
});
