import express from "express";
import projectModel from "../data/helpers/projectModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await projectModel.get();
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
