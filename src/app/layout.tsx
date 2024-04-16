"use client";
import React from "react";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Header from "@/components/containers/header";
import Footer from "@/components/containers/footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import Wrapper from "@/context/ApplicationContext";
import Search from "@/components/Search";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// const {state , dispatch}
	const router = useRouter();
	const queryClient = new QueryClient();
	return (
		<html lang="en" className={"dark"}>
			<QueryClientProvider client={queryClient}>
				<Wrapper>
					<body className="dark">
						<NextUIProvider navigate={router.push}>
							<Header />
							{children}
							<Footer />
							<Toaster position="top-right" />
							<Search />
						</NextUIProvider>
					</body>
				</Wrapper>
			</QueryClientProvider>
		</html>
	);
}
