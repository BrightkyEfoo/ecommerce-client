import { ReactNode, createContext, useReducer } from "react";
import { reducer } from "./ApplicationReducer";

export const context = createContext<any>({});

const Wrapper = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, {});
	return (
		<context.Provider value={{ state, dispatch }}>
			{children}
		</context.Provider>
	);
};

export default Wrapper
