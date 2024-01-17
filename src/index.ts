import koa from "koa";

const PORT = 3000;

const app = new koa();

app.use((ctx) => {
  ctx.body = "Hello Koa";
});

console.log(`Server running on port ${PORT}`);
app.listen(PORT);
