import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";
import createLinkScreen from "../../screens/links/createLink/createLink";

export const createLinkRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/createlink",
    component: createLinkScreen,
});