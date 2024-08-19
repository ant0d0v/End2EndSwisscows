import { faker } from "@faker-js/faker";
/**
 * Returns a pseudo-random integer number in the range from the given minimum and maximum number inclusively.
 * @param {Number} min The minimum value for the randomized number.
 * @param {Number} max The maximum value for the randomized number.
 * @returns An integer pseudo-random number between min and max inclusively.
 */
export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Returns a pseudo-random string number of the given length.
 * @param {Number} length The length of the randomized string.
 * @returns A pseudo-random string.
 */
export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let text = "";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export function randomQueryWithVideoItemSearch() {
  const word = faker.helpers.arrayElement([
    "iphone youtube",
    "Video Result",
    "video + ronaldo"
  ]);
  return word;
}