import { routeTable, simpleDispatch } from "./routes.mjs";
import { service } from "./service.mjs";
import { guarded, errorResponse, readJson } from "./transport.mjs";
import { fail } from "./errors.mjs";
import { createRouter } from "fets";
export function createApi(db, clock) {
  const app = createRouter({
    landingPage: false,
    openAPI: { endpoint: false },
    swaggerUI: { endpoint: false },
    fetchAPI: { Request, Response, Headers },
  });
  for (const [method, path, handler] of routeTable(db, service, clock))
    app.route({
      method,
      path,
      handler: async (req) => {
        try {
          return await handler(req, req.params ?? {});
        } catch (e) {
          return errorResponse(e, crypto.randomUUID());
        }
      },
    });
  return guarded(async (req) => {
    if (new URL(req.url).search)
      fail("invalid_query", "Parâmetros de URL não são aceitos.", 400);
    return (
      (await app.fetch(req)) ??
      Response.json(
        { code: "not_found", message: "Endpoint não encontrado." },
        { status: 404 },
      )
    );
  });
}
