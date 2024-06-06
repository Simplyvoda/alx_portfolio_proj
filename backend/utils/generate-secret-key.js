import { randomBytes } from "crypto";

// Generate a secure random string (32 bytes)
const secretKey = randomBytes(32).toString('hex');

console.log(secretKey);

export default secretKey;
