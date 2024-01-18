import koa from "koa";
import koaBody from "koa-body";
import { mwCatchAllError } from "./catch-all-error";
import joiRouter from "./joi-routes";

const PORT = process.env.PORT || 3000;

const app = new koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(
  koaBody({
    jsonLimit: "1kb",
  })
);

app.use(mwCatchAllError);

app.use(joiRouter.middleware());

console.log(`Server running on port ${PORT}`);
app.listen(PORT);
