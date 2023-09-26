"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = {
    users: [
        {
            method: "get",
            path: "",
            controller: "UserController",
            action: "index",
            middlewares: null,
        },
        {
            method: "get",
            path: ":username",
            controller: "UserController",
            action: "show",
            middlewares: null,
        },
        {
            method: "post",
            path: "",
            controller: "UserController",
            action: "create",
            middlewares: null,
        },
        {
            method: "put",
            path: ":username",
            controller: "UserController",
            action: "update",
            middlewares: null,
        },
        {
            method: "delete",
            path: ":username",
            controller: "UserController",
            action: "delete",
            middlewares: null,
        },
    ],
    movies: [
        {
            method: "get",
            path: "",
            controller: "MovieController",
            action: "index",
            middlewares: null,
        },
        {
            method: "get",
            path: ":id",
            controller: "MovieController",
            action: "show",
            middlewares: null,
        },
        {
            method: "post",
            path: "",
            controller: "MovieController",
            action: "create",
            middlewares: null,
        },
        {
            method: "put",
            path: ":id",
            controller: "MovieController",
            action: "update",
            middlewares: null,
        },
        {
            method: "delete",
            path: ":id",
            controller: "MovieController",
            action: "delete",
            middlewares: null,
        },
    ],
    auth: [
        {
            method: "post",
            path: "login",
            controller: "AuthController",
            action: "login",
            middlewares: null,
        },
        {
            method: "post",
            path: "register",
            controller: "AuthController",
            action: "register",
            middlewares: null,
        },
        {
            method: "post",
            path: "logout",
            controller: "AuthController",
            action: "logout",
            middlewares: null,
        },
        {
            method: "post",
            path: "refresh",
            controller: "AuthController",
            action: "refresh",
            middlewares: null,
        },
    ],
};
exports.default = routes;
//# sourceMappingURL=routes.js.map