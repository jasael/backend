"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./routes"));
function generateRoutes(app) {
    for (const basePath in routes_1.default) {
        const subPaths = routes_1.default[basePath];
        subPaths.forEach((subPath) => {
            const { method, action, controller, middlewares, path } = subPath;
            console.log(`[${method.toUpperCase()}] | [${action}] | /api/${basePath}/${path}`);
            const ControllerModule = require(`../controllers/${controller}`).default;
            const controllerModule = new ControllerModule();
            if (Array.isArray(middlewares)) {
                const middlewareFunctions = middlewares.map((middleware) => {
                    return require(`../middlewares/${middleware}`).default;
                });
                app[method](`/api/${basePath}/${path}`, ...middlewareFunctions, controllerModule[action]);
            }
            else {
                app[method](`/api/${basePath}/${path}`, controllerModule[action]);
            }
        });
    }
}
exports.default = generateRoutes;
//# sourceMappingURL=router.js.map