"use client";

import type { NextPage } from "next";
import { useEffect } from "react";

import { Desktop } from "@/components/desktop";
import { Taskbar } from "@/components/taskbar";
import { useSystem } from "@/stores/system.store";

const Page: NextPage = () => {
	const { tasks } = useSystem();

	useEffect(() => {
	}, [tasks]);

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
