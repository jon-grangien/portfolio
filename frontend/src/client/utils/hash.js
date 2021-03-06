/**
 * Hash a string and return a number
 * http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
 * @param {string} str - String to hash
 * @returns {number}
 */
const hash = (str) => {
  let hashValue = 0;
  for (let i = 0; i < str.length; ++i) {
    const char = str.charCodeAt(i);
    hashValue = char + (hashValue << 6) + (hashValue << 16) - hashValue;
  }

  return hashValue;
}

export default hash
