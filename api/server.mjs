import express from "express";
import helmet from "helmet";
import cors from "cors";

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Web API Challenge</h2>
  `);
});

export default server;
