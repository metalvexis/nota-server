import { mwCatchAllJoiError } from "./catch-all-error";
import Router from "koa-joi-router";
import { GenericNoteError } from "./types";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "./controllers";
import { JoiNote } from "./joi-objects";

const router = Router();

router.param("noteId", async (id, ctx, next) => {
  if (!id) {
    throw new GenericNoteError(400, "Missing required parameter");
  }
  await next();
});

router.route({
  method: "get",
  path: "/",
  handler: [mwCatchAllJoiError, getAllNotes],
});

router.route({
  method: "get",
  path: "/:noteId",
  handler: [mwCatchAllJoiError, getNoteById],
});

router.route({
  method: "post",
  path: "/",
  validate: {
    type: "json",
    body: JoiNote,
    continueOnError: true,
  },
  handler: [mwCatchAllJoiError, createNote],
});

router.route({
  method: "put",
  path: "/:noteId",
  validate: {
    type: "json",
    body: JoiNote,
    continueOnError: true,
  },
  handler: [mwCatchAllJoiError, updateNote],
});

router.route({
  method: "delete",
  path: "/:noteId",
  handler: [mwCatchAllJoiError, deleteNote],
});

export default router;
