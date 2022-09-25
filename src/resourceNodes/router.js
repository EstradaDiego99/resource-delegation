import express from "express";
import dotenv from "dotenv";
// import Multer from "multer";
import ResourceNode from "./model.js";
import ModelError from "../utils/modelError.js";

const router = express.Router();
dotenv.config();

// const upload = Multer();

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 128 * 1024 * 1024, // no larger than 128mb, you can change as needed.
//   },
// });

// const postMulter = multer.fields([{ name: "photos" }]);

// CREATE
router.post("/", async (req, res) => {
  const data = req.body;

  const newPost = new ResourceNode(data);
  const newPostRes = await newPost.save().catch((err) => err);
  if (newPostRes instanceof ModelError)
    return res.status(400).json({
      err: newPostRes.err,
      msg: "There was an error saving the post.",
    });
  if (newPostRes instanceof Error) return res.status(400).json(newPostRes);

  return res.json({
    msg: "The post was saved correctly.",
    id: newPostRes.id,
  });
});

// READ
router.get("/", async (req, res) => {
  const { query = {} } = req;

  const resFind = await ResourceNode.find(query).catch((err) => err);
  if (resFind instanceof Error) {
    return res.status(400).json({ msg: "Hubo un error al obtener posts." });
  }

  return res.json(resFind);
});

router.get("/:indexField", async (req, res) => {
  const { indexField } = req.params;
  const resFind = await ResourceNode.findOne(indexField).catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error reading from this post." });
  }
  if (resFind === null) {
    return res
      .status(400)
      .json({ msg: "No se encontró plan registrado con estas siglas." });
  }

  return res.json(resFind);
});

// UPDATE
router.put("/:indexField", async (req, res) => {
  const { indexField } = req.params;
  const postToUpdate = await ResourceNode.findOne({ indexField }).catch(
    (err) => err
  );
  if (postToUpdate instanceof Error) {
    return res.status(400).json({
      msg: "There was an error looking for this post.",
    });
  }
  if (postToUpdate === null) {
    return res.status(400).json({ msg: "No post was found." });
  }

  const data = req.body;
  for (const [key, value] of Object.entries(data)) {
    postToUpdate[key] = value;
  }
  const resUpdate = await postToUpdate.save().catch((err) => err);
  if (resUpdate instanceof Error) {
    return res.status(400).json({
      err: resUpdate.err,
      msg: "There was an error when trying to update this post.",
    });
  }

  return res.json("Post was successfuly updated.");
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const resDelete = await ResourceNode.deleteOne(id).catch((err) => err);
  if (resDelete instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error removing the post." });
  }
  if (resDelete === null) {
    return res.status(400).json({ msg: "This post was not found." });
  }

  return res.json({ msg: "Post successfully removed." });
});

export default router;
