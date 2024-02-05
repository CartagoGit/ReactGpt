import { RouterProvider } from "react-router-dom";
import { router } from "./presentation/router/main.router";

export const ReactGpt = () => {
	return (
		<RouterProvider router={ router} />
	);
};


