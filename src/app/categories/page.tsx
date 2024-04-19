"use client"

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
        <div className={'mx-auto container my-8'}>
            <h1 className={"text-4xl text-center font-bold my-5"}>Our categories</h1>
            <div className = "grid grid-cols-4 gap-5 my-8">
                {
                    categoriesView.data.map((category , index) => {
                        return <Category key={`${category._id}-${index}`} category={category} />
                    })
                }
            </div>
        </div>
    ) : null
}

export default CategoriesPage