import koa from "koa";
import { GenericNoteError } from "./types";
import type { ICreateNote, IUpdateNote } from "./types";
import { NoteStore } from "./store";

export const createNote = async (ctx: koa.Context, next: koa.Next) => {
  const body = ctx.request.body as ICreateNote;
  const storedNote = await NoteStore.getInstance().createNote(body);

  ctx.status = 200;
  ctx.body = storedNote;
};

export const getAllNotes = async (ctx: koa.Context, next: koa.Next) => {
  const allNotes = await NoteStore.getInstance().getAllNotes();
  ctx.status = 200;
  ctx.body = {
    notes: allNotes,
  };
};

export const getNoteById = async (ctx: koa.Context, next: koa.Next) => {
  if (!ctx.params.noteId) {
    throw new GenericNoteError(400, "Missing required parameter");
  }
  const matchedNote = await NoteStore.getInstance().getNote(ctx.params.noteId);

  if (!matchedNote) {
    throw new GenericNoteError(404, "Note not found");
  }

  ctx.status = 200;
  ctx.body = matchedNote;
};

export const updateNote = async (ctx: koa.Context, next: koa.Next) => {
  if (!ctx.params.noteId) {
    throw new GenericNoteError(400, "Missing required parameter");
  }

  const matchedNote = await NoteStore.getInstance().getNote(ctx.params.noteId);
  if (!matchedNote) {
    throw new GenericNoteError(404, "Note not found");
  }

  const body = ctx.request.body as IUpdateNote;
  const updateData = {
    ...body,
    noteId: ctx.params.noteId,
  };

  const storedNote = await NoteStore.getInstance().updateNote(
    ctx.params.noteId,
    updateData
  );

  ctx.status = 200;
  ctx.body = storedNote;
};

export const deleteNote = async (ctx: koa.Context, next: koa.Next) => {
  if (!ctx.params.noteId) {
    throw new GenericNoteError(400, "Missing required parameter");
  }
  await NoteStore.getInstance().deleteNote(ctx.params.noteId);
  ctx.status = 200;
};
