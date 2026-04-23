import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/rootRoute.tsx";


const routeTree = rootRoute.addChildren([
]);

export const router = createRouter({
    routeTree
});