import axios from "axios";
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

async function generarListaDeNodos(idInicial) {
  const listaDeNodos = [];
  const visited = new Set();

  const idsPendientes = [];
  idsPendientes.push(idInicial);
  while (idsPendientes.length > 0) {
    const id = idsPendientes.pop();
    visited.add(id);
    const nodoObj = await ResourceNode.findOne(id);
    listaDeNodos.push(nodoObj);
    for (const nodoId of Object.keys(nodoObj.ingresos))
      if (!visited.has(nodoId)) idsPendientes.push(nodoId);
    for (const nodoId of Object.keys(nodoObj.egresos))
      if (!visited.has(nodoId)) idsPendientes.push(nodoId);
  }

  return listaDeNodos;
}

async function generarListaDeEnlaces(listaNodos = []) {
  const listaDeEnlaces = [];
  for (const nodo of listaNodos) {
    for (const [nodoEgreso, cantidad] of Object.entries(nodo.egresos)) {
      listaDeEnlaces.push({
        source: nodo.id,
        target: nodoEgreso,
        value: cantidad,
      });
    }
  }
  return listaDeEnlaces;
}

async function formarJerarquiaDistribucion(nodo) {
  if (nodo.sinEgresos === true) {
    return nodo;
  }
  if (nodo.egresos === undefined || Object.keys(nodo.egresos) === 0) {
    return nodo;
  }

  const egresosIds = Object.keys(nodo.egresos);
  const egresos = await Promise.all(
    egresosIds.map(async (idEgreso) =>
      formarJerarquiaDistribucion(await ResourceNode.findOne(idEgreso))
    )
  );
  egresos.sort(
    (nodoA, nodoB) => getSumaIngresos(nodoA) - getSumaIngresos(nodoB)
  );
  nodo.egresos = egresos;

  return nodo;
}

function getSumaIngresos(nodoDistribucion) {
  const { ingresos } = nodoDistribucion;
  if (ingresos === undefined) {
    return 0;
  }
  const ingresosValues = Object.values(ingresos);

  return ingresosValues.length <= 0
    ? 0
    : Object.values(ingresos).reduce((a, b) => a + b);
}

async function actualizarNodosReciprocos(newNodeId, newNode) {
  for (const nodeId of Object.keys(newNode.ingresos)) {
    const nodeToUpdate = await ResourceNode.findOne(nodeId);
    nodeToUpdate.egresos[newNodeId] = newNode.ingresos[nodeId];
    nodeToUpdate.sinEgresos = false;
    delete nodeToUpdate.id;
    const newResourceNode = new ResourceNode(nodeToUpdate);
    await newResourceNode.saveWithId(nodeId);
  }
  for (const nodeId of Object.keys(newNode.egresos)) {
    const nodeToUpdate = await ResourceNode.findOne(nodeId);
    nodeToUpdate.ingresos[newNodeId] = newNode.egresos[nodeId];
    nodeToUpdate.sinIngresos = false;
    delete nodeToUpdate.id;
    const newResourceNode = new ResourceNode(nodeToUpdate);
    await newResourceNode.saveWithId(nodeId);
  }
}

// CREATE
router.post("/", async (req, res) => {
  const data = req.body;

  const newNode = new ResourceNode(data);
  const newRes = await newNode.save().catch((err) => err);
  if (newRes instanceof ModelError)
    return res.status(400).json({
      err: newRes.err,
      msg: "There was an error saving the post.",
    });
  if (newRes instanceof Error) return res.status(400).json(newRes);

  // Actualizar los egresos/ingresos recíprocos
  const newNodeId = newRes.id;
  await actualizarNodosReciprocos(newNodeId, newNode);

  return res.json({
    msg: "El nodo de recurso fue guardado correctamente!",
    id: newNodeId,
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

router.get("/:indexField/grafo", async (req, res) => {
  const { indexField } = req.params;
  const resFind = await ResourceNode.findOne(indexField).catch((err) => err);
  if (resFind instanceof Error) {
    return res.status(400).json({ msg: "Hubo un error al leer este nodo." });
  }
  if (resFind === null) {
    return res
      .status(400)
      .json({ msg: "No se encontró un nodo de recursos con este id." });
  }

  const nodoDistribucion = resFind;

  const nodosIngreso = await Promise.all(
    Object.keys(nodoDistribucion?.ingresos).map((idIngreso) =>
      ResourceNode.findOne(idIngreso)
    )
  );

  nodosIngreso.sort(
    (nodoA, nodoB) => getSumaIngresos(nodoA) - getSumaIngresos(nodoB)
  );

  const jerarquiaDistribucion = await formarJerarquiaDistribucion(
    nodoDistribucion
  );

  const listaDeNodos = await generarListaDeNodos(indexField);
  const listaDeEnlaces = await generarListaDeEnlaces(listaDeNodos);

  const nodosDict = {};
  for (const nodo of listaDeNodos) {
    nodosDict[nodo.id] = nodo;
  }

  const resHeroku = await axios.post(
    "https://python-api-hackmty.herokuapp.com/get-net-flux",
    nodosDict,
    {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  );

  return res.json({
    nodosIngreso,
    nodoDistribucion: jerarquiaDistribucion,
    listaDeNodos,
    listaDeEnlaces,
    insights: resHeroku.data,
  });
});

// UPDATE
router.put("/:nodeId", async (req, res) => {
  const { nodeId } = req.params;
  const nodeToUpdate = await ResourceNode.findOne(nodeId).catch((err) => err);
  if (nodeToUpdate instanceof Error) {
    return res.status(400).json({
      msg: "Hubo un error al leer este nodo de distribución.",
    });
  }
  if (nodeToUpdate === null) {
    return res.status(400).json({ msg: "No se encontró el nodo." });
  }

  const data = req.body;
  for (const [key, value] of Object.entries(data)) {
    nodeToUpdate[key] = value;
  }
  await actualizarNodosReciprocos(nodeId, nodeToUpdate);
  const resourceNodeToUpdate = new ResourceNode(nodeToUpdate);
  const resUpdate = await resourceNodeToUpdate.saveWithId(nodeId);

  if (resUpdate instanceof Error) {
    return res.status(400).json({
      err: resUpdate.err,
      msg: "Hubo un error al actualizar este nodo.",
    });
  }

  return res.json({
    msg: "El nodo de recurso fue guardado correctamente!",
    id: nodeId,
  });
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
