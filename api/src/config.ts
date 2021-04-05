function getString(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Configuration ${name} is not set`);
  }
  return value;
}

export const MONGODB_URI = getString('MONGODB_URI');
export const MONGODB_DB_NAME = getString('MONGODB_DB_NAME');
