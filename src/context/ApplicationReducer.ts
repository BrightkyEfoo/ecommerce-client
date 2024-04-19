const reducer = (state: any, action: any) => {
	switch (action.type) {
		case "set_user":
			return {
				...state,
				user: action.payload,
			};
		case "add_product_to_cart":
			return {
				...state,
				cart: {
					...(state.cart ? state.cart : {}),
					[action.payload.product._id]: {
						product: action.payload.product,
						quantity: action.payload.quantity,
					},
				},
			};
		case 'remove_product_to_cart':
			const removedCopy = {...state.cart}
			delete removedCopy[action.payload.id]
			return {
				...state,
				cart: removedCopy,
			};
		case 'decrease_product_quantity_to_cart':
					const itemDecrease = state.cart[action.payload.id] || {}
					return {
						...state,
						cart: {
							...(state.cart ? state.cart : {}),
							[action.payload.id]: {
								...itemDecrease,
								quantity: itemDecrease.quantity ? itemDecrease.quantity - 1 : 0,
							},
						},
					};
		case 'increase_product_quantity_to_cart':
					const itemIncrease = state.cart[action.payload.id] || {}
					return {
						...state,
						cart: {
							...(state.cart ? state.cart : {}),
							[action.payload.id]: {
								...itemIncrease,
								quantity: itemIncrease.quantity < itemIncrease.product.stock ? itemIncrease.quantity + 1 : itemIncrease.quantity,
							},
						},
					};
		default:
			return {
				...state,
			};
	}
};

export { reducer };
