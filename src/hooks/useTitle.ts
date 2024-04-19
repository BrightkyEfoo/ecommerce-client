"use client";
import { useContext, useEffect } from "react";
import { capitalize } from "@/utils/capitalize";
import { context } from "@/context/ApplicationContext";

const useTitle = (title: string) => {
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
		}
	}, [dispatch]);
};

export { useTitle };
