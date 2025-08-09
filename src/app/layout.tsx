import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Windows 98",
	description: "Created by Houssaine Amzil",
};

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;
