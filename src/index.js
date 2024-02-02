import React from "react"

import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "./home.jsx"

const router = createBrowserRouter([
	{
		path: "app",
		element: <Home />,
	},
])

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
)
