import crypto from 'crypto';

export function safeExtend<T, U>(obj: T, values: U): T & U {
  return Object.assign(obj, values);
}

export function safeKeys<T>(obj: T): Array<keyof T> {
  return Object.keys(obj) as any;
}

export function safeAssign<T>(obj: T, values: Partial<T>) {
  return Object.assign(obj, values);
}

export function randomUniqString() {
  return randomString(15);
}

export function randomString(len: number) {
  const charSet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    const randomPoz = randomInt() % charSet.length;
    randomString += charSet[randomPoz];
  }
  return randomString;
}

export function randomInt() {
  return crypto.randomBytes(4).readUInt32BE(0);
}
