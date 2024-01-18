import koa from "koa";
import koaBody from "koa-body";
import { mwCatchAllError } from "./catch-all-error";
import joiRouter from "./joi-routes";

const PORT = process.env.PORT || 3000;

const app = new koa();

app.use(
  koaBody({
    jsonLimit: "1kb",
  })
);

app.use(mwCatchAllError);

app.use(joiRouter.middleware());

console.log(`Server running on port ${PORT}`);
app.listen(PORT);
