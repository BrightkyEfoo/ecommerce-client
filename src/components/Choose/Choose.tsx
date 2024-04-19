"use client";
import React, {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

export const chooseContext = createContext<{
	id: string;
	presences: number;
	setPresences: Dispatch<SetStateAction<number>>;
}>({} as any);
const Choose = ({
	children,
	id,
}: {
	children: React.ReactNode;
	id: string;
}) => {
	const [presences, setPresences] = useState<number>(0);
	return (
		<chooseContext.Provider value={{ id, presences, setPresences }}>
			{React.Children.toArray(children).map((child, key) => (
				<CanShowChild key={`${key}`}>{child}</CanShowChild>
			))}
		</chooseContext.Provider>
	);
};

const CanShowChild = ({ children }: { children: React.ReactNode , key?: string}) => {
	const { id } = useContext(chooseContext);
	if (!id)
		throw new Error(
			"When component must have a Choose Parent with a valid id"
		);

	return children;
};

export const When = ({
	condition,
	children,
}: {
	condition: boolean;
	children: React.ReactNode;
}) => {
	const { setPresences } = useContext(chooseContext);
	useEffect(() => {
		if (condition) setPresences((prev) => (prev ? prev + 1 : 1));
		else setPresences((prev) => (prev ? prev - 1 : prev));
	}, [condition, setPresences]);

	return condition ? children : null;
};

export const Otherwise = ({ children }: { children: React.ReactNode }) => {
	const { presences } = useContext(chooseContext);

	return presences === 0 ? children : null;
};

export default Choose;
