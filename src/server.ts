//import index from "src/index.html" with { type: "html" };

import { App } from "builds/app";

const transpiler = new Bun.Transpiler({
  loader: 'ts',
  target: 'browser'
});



const buildsMatchers = new Map<string, () => Response>();

const init = async () => {
  const builds = await Bun.build({
    entrypoints: ['./src/web.ts'],
    target: "browser",
    splitting: true,
    outdir: './src/assets/builds',
    tsconfig: './tsconfig.web.json',
  });

  for (const build of builds.outputs) {
    console.log(`Build output: ${build.path}   ${build.path.substring(build.path.lastIndexOf('/') + 1)} (${build.type})`);
    buildsMatchers.set(
      build.path.substring(build.path.lastIndexOf('/') + 1)
      , () => new Response(build.stream(), {
        headers: {
          "Content-Type": build.type,
        },
      }));
  }
}
await init();

const server = Bun.serve({
  port: 3000,

  development: true,
  async fetch(req, server) {
    const url = new URL(req.url);
    console.log(`Received request: ${req.method} ${req.url}`);

    if (url.pathname.startsWith("/builds/")) {
      const buildPath = url.pathname.substring("/builds/".length);
      const buildMatcher = buildsMatchers.get(buildPath);
      console.log(`Build request for: ${buildPath}`);
      if (buildMatcher) {
        return buildMatcher();
      } else {
        return new Response(`Build not found: ${buildPath}`, {
          status: 404,
          headers: { "Content-Type": "text/plain" }
        });
      }
    }

    if (0 && url.pathname.endsWith(".js")) {
      const filePath = `src/assets${url.pathname.replace(/\.js$/, ".ts")}`;

      try {
        // Читаем TypeScript файл
        const tsCode = await Bun.file(filePath).text();

        // Транспилируем в JavaScript
        const jsCode = await transpiler.transform(tsCode);

        return new Response(jsCode, {
          headers: { "Content-Type": "application/javascript" }
        });
      } catch (error) {
        console.error(`Error transpiling ${filePath}:`, error);
        return new Response(`// Error loading ${filePath}`, {
          status: 404,
          headers: { "Content-Type": "application/javascript" }
        });
      }
    }

    if (url.pathname === "/") {
      const { App } = await import("./components/app/app");
      
      const rewriter = new HTMLRewriter();
      rewriter.on("div#app", {
        async element(element) {
          const app = new App();
      
          element.replace(app.run(), {
            html: true,
          });
        },
      });
      /*
      const fileResponse = new Response(Bun.file("src/index.html"));
      const html_content = await rewriter.transform(fileResponse).blob();
      return new Response(html_content, {
        headers: { "Content-Type": "text/html, charset=utf-8" }
      });
      */
     return new Response(await Bun.file("src/index.html"), {
        headers: { "Content-Type": "text/html, charset=utf-8" }
      }); 
    }
    const success = server.upgrade(req);
    if (success) {
      // Bun automatically returns a 101 Switching Protocols
      // if the upgrade succeeds
      return undefined;
    }

    // handle HTTP request normally
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error"
    });
  },
  websocket: {
    // this is called when a message is received
    async message(ws, message) {
      console.log(`Received ${message}`);
      // send back a message
      ws.send(`You said: ${message}`);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);