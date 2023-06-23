import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};
export async function dbConnect() {
  if (conn.isConnected) return;

  const db = await connect(
    process.env.NEXT_PUBLIC_MONGODB_URL ||
      "mongodb://127.0.0.1:27017/nextjsmongodb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0"
  );
  conn.isConnected = db.connections[0].readyState;

  console.log("DBName: ", db.connection.db.databaseName);
}

connection.on("connected", () => {
  console.log("Mongo DB is Connected");
});

connection.on("error", (err) => {
  console.log(err);
});
