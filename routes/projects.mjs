import express from "express";
import projectModel from "../data/helpers/projectModel.js";

const router = express.Router();

// Get All
router.get("/", async (req, res) => {
  try {
    const projects = await projectModel.get();
    res.send(projects);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await projectModel.get(id);
    if (!projects)
      return res.status(404).send({ message: "No project with that ID found" });
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get the actions of a project
router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await projectModel.get(id);
    const actions = await projectModel.getProjectActions(project.id);

    if (!project)
      return res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });

    if (!actions.length)
      throw new Error("The actions information could not be retrieved.");

    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add project
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).json({
      errorMessage: "Please provide name and description for the project."
    });
  try {
    const project = await projectModel.insert(req.body);
    res.status(201).send(project);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update projects
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.body)
    return res
      .status(500)
      .json({ error: "Please provide values to update the project." });

  try {
    const project = await projectModel.get(id);
    const updatedProject = await projectModel.update(id, req.body);

    if (!project)
      return res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.log("The project information could not be modified.", error);
    res
      .status(500)
      .json({ error: "The project information could not be modified." });
  }
});

export default router;
