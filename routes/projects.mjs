import express from "express";
import projectModel from "../data/helpers/projectModel.js";

const router = express.Router();

// Get All
router.get("/", async (req, res) => {
  try {
    const projects = await projectModel.get();
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await projectModel.get(id);
    if (!projects)
      return res.status(404).send({ message: "No project with that ID found" });
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
