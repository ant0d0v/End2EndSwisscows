import fs from "fs";
import { promises as fsp } from "fs";
import authDataInternal from "../data/auth/internalUser.json";
import authDataExternal from "../data/auth/externalUser.json";

export function getBearerTokenOfInternalUser() {
  const origins = authDataInternal.origins;
  const accessToken = origins
    .find((origin) => origin.origin === "https://dev.swisscows.com")
    .localStorage.find((cookie) => cookie.name === "oidc.access_token").value;
  return accessToken;
}

export function getBearerTokenOfExternalUser() {
  const origins = authDataExternal.origins;
  const accessToken = origins
    .find((origin) => origin.origin === "https://dev.swisscows.com")
    .localStorage.find((cookie) => cookie.name === "oidc.access_token").value;
  return accessToken;
}
export async function saveStorageState(object) {
  const localStorage = await object.evaluate(() =>
    JSON.stringify(localStorage)
  );
  fs.writeFileSync("./data/auth/localStorage.json", localStorage, "utf-8");
}

export async function getStorageKey(key) {
  const fileContent = await fsp.readFile("data/auth/localStorage.json", "utf-8");
  const savedLocalStorage = JSON.parse(fileContent);
  return savedLocalStorage[key]
}

export async function setValueStorageKey(key) {
  const fileContent = await fsp.readFile("data/auth/localStorage.json", "utf-8");
  const storage = JSON.parse(fileContent);
  const lastClosed = storage[key];
  storage[key] = lastClosed - 86400000
  const updatedAuthData = JSON.stringify(storage, null, 2);
  fs.writeFileSync("data/auth/localStorage.json", updatedAuthData);
}

export function removeRefreshToken(authFilePath) {
  const authFileContent = fs.readFileSync(authFilePath, "utf-8");
  let authData = JSON.parse(authFileContent);

  authData.origins.forEach((origin) => {
    origin.localStorage = origin.localStorage.filter(
      (item) => item.name !== "oidc.refresh_token"
    );
  });
  fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2));
}
