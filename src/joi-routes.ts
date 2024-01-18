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
  handler: async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
    ctx.status = 200;
  },
});

router.route({
  method: "get",
  path: "/notes",
  handler: [mwCatchAllJoiError, getAllNotes],
});

router.route({
  method: "get",
  path: "/notes/:noteId",
  handler: [mwCatchAllJoiError, getNoteById],
});

router.route({
  method: "post",
  path: "/notes",
  validate: {
    type: "json",
    body: JoiNote,
    continueOnError: true,
  },
  handler: [mwCatchAllJoiError, createNote],
});

router.route({
  method: "put",
  path: "/notes/:noteId",
  validate: {
    type: "json",
    body: JoiNote,
    continueOnError: true,
  },
  handler: [mwCatchAllJoiError, updateNote],
});

router.route({
  method: "delete",
  path: "/notes/:noteId",
  handler: [mwCatchAllJoiError, deleteNote],
});

export default router;
