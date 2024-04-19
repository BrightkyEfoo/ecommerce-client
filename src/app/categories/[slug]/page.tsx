"use client"
import React, { useState } from "react";
import { useTitle } from "@/hooks/useTitle";
import { useQuery } from "react-query";
import { axiosOpenedInstance } from "@/utils/axios";
import { IProduct } from "@/components/sections/ProductsSection";
import ProductSmallCard from "@/components/cards/Product";
import {Pagination} from '@nextui-org/react'
import { useParams } from "next/navigation";

const CategoryPage = () => {
	const params = useParams()
	const [totalPage , setTotalPage] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	useTitle("Products");
	const productsView = useQuery({
		queryKey: ["categories-products" , currentPage],
		queryFn: async () => {
			const res = await axiosOpenedInstance.get(`/categories/${params.slug.split("-").at(-1)}/products/?page=${currentPage}`);
			console.log(res)
			setTotalPage(Math.ceil(res.data.total / res.data.limit))
			return res.data.products as IProduct[];
		}
	});
	useTitle(productsView?.data ? (productsView?.data[0].category || "Category") : 'Loading...' )

	return productsView.isSuccess ? (
		<div className={'mx-auto container my-8'}>
			<h1 className={"text-4xl text-center font-bold my-5"}>Our products of category </h1>
			
			
			<div className = "grid grid-cols-4 gap-5 my-8">
				{
					productsView.data.map((product , index) => {
						return <ProductSmallCard key={`${product._id}-${index}`} product={product} />
					})
				}
			</div>
			
			{
				totalPage > 1 ? (
					<div className={'flex justify-center '}>
						<Pagination loop showControls total={totalPage} initialPage={1} onChange={setCurrentPage} page={currentPage}/>
					</div>) : null
			}
		</div>
	) : null
}

export default CategoryPage