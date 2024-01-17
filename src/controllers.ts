import koa from "koa";
import { GenericNoteError } from "./types";
import type { ICreateNote, IUpdateNote } from "./types";
import { NoteStore } from "./store";

export const createNote = async (ctx: koa.Context, next: koa.Next) => {
  const body = ctx.request.body as ICreateNote;
  if (!body.title || !body.body) {
    throw new GenericNoteError(400, "Missing title or body");
  }
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
  const id = ctx.path.split("/")[1] || "";
  if (!id) {
    throw new GenericNoteError(400, "Missing note id");
  }
  const matchedNote = await NoteStore.getInstance().getNote(id);

  if (!matchedNote) {
    throw new GenericNoteError(404, "Note not found");
  }

  ctx.status = 200;
  ctx.body = matchedNote;
};

export const updateNote = async (ctx: koa.Context, next: koa.Next) => {
  const id = ctx.path.split("/")[1] || "";

  const matchedNote = await NoteStore.getInstance().getNote(id);
  if (!matchedNote) {
    throw new GenericNoteError(404, "Note not found");
  }

  const body = ctx.request.body as IUpdateNote;
  if (!body.title && !body.body) {
    throw new GenericNoteError(400, "Missing title or body");
  }
  const updateData = {
    ...body,
    noteId: id,
  };

  const storedNote = await NoteStore.getInstance().updateNote(id, updateData);

  ctx.status = 200;
  ctx.body = storedNote;
};

export const deleteNote = async (ctx: koa.Context, next: koa.Next) => {
  try {
    const id = ctx.path.split("/")[1] || "";
    await NoteStore.getInstance().deleteNote(id);
  } catch (error) {
    throw error;
  }
  ctx.status = 200;
};
