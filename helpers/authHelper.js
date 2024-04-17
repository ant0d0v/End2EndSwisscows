import fs from "fs";
const authFilePathForInternalUser = "./data/auth/internalUser.json";
const authFilePathForExternalUser = "./data/auth/externalUser.json";

export function getBearerTokenOfInternalUser() {
    // Read the file content
    const authFileContent = fs.readFileSync(authFilePathForInternalUser, "utf-8");
    let authData = JSON.parse(authFileContent);
  
    // Find the access token
    const origins = authData.origins;
    let accessToken = null;
    origins.forEach((origin) => {
      origin.localStorage.forEach((storageItem) => {
        if (storageItem.name === "oidc.access_token") {
          accessToken = storageItem.value; // Save the access token value
        }
      });
    });
    return accessToken;
  };

export function getBearerTokenOfExternalUser() {
    // Read the file content
    const authFileContent = fs.readFileSync(authFilePathForExternalUser, "utf-8");
    let authData = JSON.parse(authFileContent);
  
    // Find the access token
    const origins = authData.origins;
    let accessToken = null;
    origins.forEach((origin) => {
      origin.localStorage.forEach((storageItem) => {
        if (storageItem.name === "oidc.access_token") {
          accessToken = storageItem.value; // Save the access token value
        }
      });
    });
    return accessToken;
};

export function removeRefreshToken (authFilePath) {
    const authFileContent = fs.readFileSync(authFilePath, "utf-8");
    let authData = JSON.parse(authFileContent);
  
    authData.origins.forEach((origin) => {
      origin.localStorage = origin.localStorage.filter(
        (item) => item.name !== "oidc.refresh_token"
      );
    });
    fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2));
};   
  