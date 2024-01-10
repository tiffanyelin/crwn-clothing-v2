import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// see context as two piece. Storage and literal context -- actual value you want to access.
// Context is like a storage place. It's a component that exclusively stores things.
// createContext builds out a context for us, and we'll pass it a default value (not necessarily the initial value);
// This is the actual value you want to access:
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

// This is the provider, which is the actual functional component that receives children, and on every context that gets built for us, there is a .Provider. This will wrap around any components to provide access to the values inside.
export const UserProvider = ({ children }) => {
	// Store a user state, initialize value as null:
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		return unsubscribe;
	}, [])

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}