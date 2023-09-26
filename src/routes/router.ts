import { Application } from "express";
import _routes from "./routes";

export default function generateRoutes(app: Application) {
  for (const basePath in _routes) {
    const subPaths = _routes[basePath];

    subPaths.forEach((subPath) => {
      const { method, action, controller, middlewares, path } = subPath;

      console.log(`[${method.toUpperCase()}] | [${action}] | /api/${basePath}/${path}`);

      const ControllerModule = require(`../controllers/${controller}`).default;
      const controllerModule = new ControllerModule();

      if (Array.isArray(middlewares)) {
        const middlewareFunctions = middlewares.map((middleware) => {
          return require(`../middlewares/${middleware}`).default;
        });

        app[method](
          `/api/${basePath}/${path}`,
          ...middlewareFunctions,
          controllerModule[action]
        );
      } else {
        app[method](`/api/${basePath}/${path}`, controllerModule[action]);
      }
    });
  }
}
