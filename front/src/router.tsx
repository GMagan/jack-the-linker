import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/rootRoute.tsx";
import { createLinkRoute } from "./routes/links/createLinkRoute.tsx";

const routeTree = rootRoute.addChildren([
    createLinkRoute,
]);

export const router = createRouter({
    routeTree
});