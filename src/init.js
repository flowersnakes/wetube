import "regenerator-runtime";
import "dotenv/config";

const sss = String(process.env.DB_URL);
console.log(sss);

import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
