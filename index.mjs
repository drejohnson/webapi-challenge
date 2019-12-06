import server from "./api/server.mjs";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Server up and running on ${port}`));
