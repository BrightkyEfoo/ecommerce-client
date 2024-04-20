"use client";

import { axiosOpenedInstance } from "@/utils/axios";
import Category, { ICategory } from "@/components/cards/Category";
import { useQuery } from "react-query";
import { useTitle } from "@/hooks/useTitle";

const CategoriesPage = () => {
	useTitle("Categories");
	const categoriesView = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const res = await axiosOpenedInstance.get("/categories");
			return res.data.categories as ICategory[];
		},
	});
	return categoriesView.isSuccess ? (
		<div className={"mx-auto container my-8"}>
			<h1 className={"text-4xl text-center font-bold my-5"}>
				Our categories
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-5 my-8">
				{categoriesView.data.map((category, index) => {
					return (
						<Category
							key={`${category._id}-${index}`}
							category={category}
						/>
					);
				})}
			</div>
		</div>
	) : null;
};

export default CategoriesPage;
