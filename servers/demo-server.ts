import "dotenv/config";
import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";

const PORT = +(process.env.PORT || "4324");
const HOST = process.env.HOST || "0.0.0.0";

const app = fastify({ logger: true });


const PREVIEW_BUILD_DIR = path.join(__dirname, "../out/preview");

app.register(fastifyStatic, {
  root: PREVIEW_BUILD_DIR,
  index: ["index.html"],
  setHeaders: (res) => {
    res.setHeader("x-csb-no-sw-proxy", "1");
  },
  decorateReply: false,
});

// Run the server!
app.listen({ port: PORT, host: HOST }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`Server is now listening on ${address}`);
});