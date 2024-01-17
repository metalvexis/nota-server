import Router from "@koa/router";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "./controllers";

const router = new Router();

router
  .get("/", getAllNotes)
  .get("/:id", getNoteById)
  .post("/", createNote)
  .put("/:id", updateNote)
  .delete("/:id", deleteNote);

// router.use((ctx) => ctx.status === 404 && (ctx.message = "Nota API Not Found"));

export default router;
