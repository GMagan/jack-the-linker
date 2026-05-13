import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";
import redirectScreen from "../../screens/redirect/redirect";

export const redirectRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/r/$code",
    component: redirectScreen,
});