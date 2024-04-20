import React from 'react'
import { IProduct } from '../sections/ProductsSection'

export type TCart = {product: IProduct, quantity: number}
const Cart = ({cart} : {cart : TCart}) => {
    console.log('cart', cart)
  return (
    <div>Cart</div>
  )
}

export default Cart