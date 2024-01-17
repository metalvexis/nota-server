import koa from "koa";
import koaBody from "koa-body";
import { mwCatchAllError } from "./catch-all-error";
import router from "./routes";

const PORT = 3000;

const app = new koa();

app.use(
  koaBody({
    jsonLimit: "1kb",
  })
);

app.use(mwCatchAllError);

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${PORT}`);
app.listen(PORT);
