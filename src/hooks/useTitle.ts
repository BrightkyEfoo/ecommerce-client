"use client";
import { useContext, useEffect } from "react";
import { capitalize } from "@/utils/capitalize";
import { context } from "@/context/ApplicationContext";
import { useRouter } from "next/navigation";

const useTitle = (title: string, isSecured?: boolean) => {
	const router = useRouter();
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.document.title = capitalize(title);
		}
	}, [title]);
	const { dispatch } = useContext(context);
	useEffect(() => {
		const userFromLocalStorage = localStorage.getItem("user");
		if (userFromLocalStorage) {
			dispatch({
				type: "set_user",
				payload: JSON.parse(userFromLocalStorage),
			});
		} else {
			if (isSecured) {
				router.push("/auth/login");
			}
		}
	}, [dispatch, isSecured, router]);
};

export { useTitle };
