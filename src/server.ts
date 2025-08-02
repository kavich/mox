//import index from "src/index.html" with { type: "html" };
//https://github.com/oven-sh/bun/blob/9a2dfee3caa5ef616653929eab3ad112d380f752/docs/bundler/fullstack.md

import index from "src/index.html" with { type: "html" };


const server = Bun.serve({
  port: 3000,

  development: true,
  routes: {
    "/": index,
  },
  async fetch(req, server) {
   
    // handle HTTP request normally
    return new Response("Error", {
      status: 404,
      statusText: "Not Found"
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