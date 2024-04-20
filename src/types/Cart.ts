export interface ICartB {
	_id: string;
	user: string;
	products: Product[];
	totalProducts: number;
	discountedTotal: number;
	total: number;
	totalQuantity: number;
	__v: number;
}

export interface Product {
	_id: string;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
	__v: number;
	quantity: number;
}
