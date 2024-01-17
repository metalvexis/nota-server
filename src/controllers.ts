import koa from "koa";
import { GenericNoteError } from "./types";
import type { ICreateNote } from "./types";
import { NoteStore } from "./store";

export const createNote = async (ctx: koa.Context, next: koa.Next) => {
  console.log("createNote");

  const body = ctx.request.body as ICreateNote;
  if (!body.title || !body.body) {
    throw new GenericNoteError(400, "Missing title or body");
  }

  console.log("body", body);

  const storedNote = await NoteStore.getInstance().createNote(body);

  ctx.status = 200;
  ctx.body = storedNote;
};

export const getAllNotes = async (ctx: koa.Context, next: koa.Next) => {
  try {
    console.log("getAllNotes");
    ctx.status = 200;
  } catch (error) {
    throw new GenericNoteError(500, "Error getting all notes");
  }
};

export const getNoteById = async (ctx: koa.Context, next: koa.Next) => {
  try {
    console.log("getNoteById");
    ctx.status = 200;
  } catch (error) {
    throw new GenericNoteError(500, "Error getting note");
  }
};

export const updateNote = async (ctx: koa.Context, next: koa.Next) => {
  try {
    console.log("updateNote");
  } catch (error) {
    throw new GenericNoteError(500, "Error getting all notes");
  }
};

export const deleteNote = async (ctx: koa.Context, next: koa.Next) => {
  try {
    console.log("deleteNote");
  } catch (error) {
    throw new GenericNoteError(500, "Error getting all notes");
  }
};
