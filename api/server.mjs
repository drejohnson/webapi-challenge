import express from "express";
import helmet from "helmet";
import cors from "cors";

import projectsRoute from "../routes/projects.mjs";

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/projects", projectsRoute);

server.get("/", (req, res) => {
  res.send(`
    <h2>Web API Challenge</h2>
  `);
});

export default server;
