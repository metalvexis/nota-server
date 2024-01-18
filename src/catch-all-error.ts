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

export async function mwCatchAllJoiError(ctx: koa.Context, next: koa.Next) {
  if (ctx.invalid) {
    const errs: [string, string][] = [];
    for (const key of Object.keys(ctx.invalid)) {
      errs.push([key, `${ctx.invalid[key]}`]);
    }

    throw new GenericNoteError(400, JSON.stringify(errs));
  }
  await next();
}
