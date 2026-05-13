import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/rootRoute.tsx";
import { createLinkRoute } from "./routes/links/createLinkRoute.tsx";
import { redirectRoute } from "./routes/redirect/redirect.tsx";

const routeTree = rootRoute.addChildren([
    createLinkRoute,
    redirectRoute,
]);

export const router = createRouter({
    routeTree
});