"use client";

import type { NextPage } from "next";
import { useEffect } from "react";

import { Desktop } from "@/components/desktop";
import { Taskbar } from "@/components/taskbar";

const Page: NextPage = () => {
	useEffect(() => {
		window.addEventListener("contextmenu", (event) => event.preventDefault());

		return () => {
			window.removeEventListener("contextmenu", (event) =>
				event.preventDefault(),
			);
		};
	}, []);

	return (
		<>
			<Desktop />
			<Taskbar />
		</>
	);
};

export default Page;
