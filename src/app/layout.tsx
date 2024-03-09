import "_styles/globals.scss";
import cn from "classnames";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Windows 98",
  description: "Windows 98 Clone.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={cn()}>{children}</body>
    </html>
  );
};

export default RootLayout;
