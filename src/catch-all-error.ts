import koa from "koa";
import { GenericNoteError } from "./types";
// Create a koa middleware that set the koa context status to 500 for any error caught
export async function mwCatchAllError(ctx: koa.Context, next: koa.Next) {
  try {
    await next();
  } catch (error) {
    if (error instanceof GenericNoteError) {
      ctx.status = error.status;
      ctx.body = error.message;
    }
  }
}
