function getEnvConfig() {
  const {
    PORT,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ENCRYPTION_KEY,
    DB_NAME,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_PORT,
  } = process.env;

  return {
    port: Number(PORT),
    encryptionKey: ENCRYPTION_KEY,
    jwt: {
      secretKey: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN,
    },
    db: {
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      host: DB_HOST
    },
  };
}

module.exports = { getEnvConfig };