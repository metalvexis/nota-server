import Router from "@koa/router";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "./controllers";

const router = new Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/", updateNote);

router.delete("/:id", deleteNote);

// router.use((ctx) => ctx.status === 404 && (ctx.message = "Nota API Not Found"));

export default router;
