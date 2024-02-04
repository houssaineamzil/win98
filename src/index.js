import React from "react"

import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "./home.jsx"
import { NotFound } from "./notFound.jsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/404",
		element: <NotFound />,
	},
])

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
)
