export const mongo_url = process.env.MONGO_DB_URL || "";
export const port = process.env.PORT || 3000;
export const host = process.env.HOST || "localhost";
export const corsUrl = process.env.CORS_URL || `http://${host}:3001`;
