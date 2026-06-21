import app from "../src/app.js";
import { connectDB } from "../src/config/mongoConnection.js";

await connectDB();

export default app;
