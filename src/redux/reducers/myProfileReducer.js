import { GET_USER_LOGGED, POST_ADDRESS, POST_DOG, USER_LOGOUT, POST_IMAGE, POST_IMAGE_DOG } from "../actions";

const initialState = {
	user: "",
	// commenti: [],
	// preferiti: [],
};

const myProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_LOGGED:
			return {
				...state,
				user: action.payload,
			};
		case USER_LOGOUT:
			return initialState;
		case POST_ADDRESS:
			return {
				...state,
				user: {
					...state.user,
					address: action.payload,
				},
			};
		case POST_DOG:
			return {
				...state,
				user: {
					...state.user,
					dogs: [...state.user.dogs, action.payload],
				},
			};
		case POST_IMAGE:
			return {
				...state,
				user: {
					...state.user,
					image: action.payload,
				},
			};
		case POST_IMAGE_DOG:
			return {
				...state,
				user: {
					...state.user,
					dogs: state.user.dogs.map((dog) => {
						if (dog.id === action.payload.id) {
							return {
								...dog,
								image: action.payload.response,
							};
						}
						return { ...dog };
					}),
				},
			};
		// case GET_COMMENTI:
		// 	return {
		// 		...state,
		// 		commenti: action.payload,
		// 	};
		// case GET_PREFERITI:
		// 	return {
		// 		...state,
		// 		preferiti: action.payload,
		// 	};
		default:
			return state;
	}
};

export default myProfileReducer;
