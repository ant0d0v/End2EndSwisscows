import fs from "fs";
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
