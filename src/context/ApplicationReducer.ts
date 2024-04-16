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
						product: action.payload.produced,
						quandtity: action.payload.quantity,
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
