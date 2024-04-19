"use client"
import React from 'react'
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { IProduct } from "@/components/sections/ProductsSection";
import {Image} from '@nextui-org/react'
import { useRouter } from "next/navigation";
import slugify from 'slugify';
const ProductSmallCard = ({product} : {product : IProduct}) => {

  const router = useRouter()
  return (
    <Card shadow="sm" isPressable onPress={() => router.push(`/products/${slugify(product.title)}-${product._id}`)}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.title}
          className="w-full object-cover h-[140px]"
          src={product.images[0]}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{product.title}</b>
        <p className="text-default-500">${product.price}</p>
      </CardFooter>
    </Card>
  )
}

export default ProductSmallCard