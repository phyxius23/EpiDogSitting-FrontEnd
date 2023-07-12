import { GET_COMMENTI, GET_PREFERITI, GET_USER_LOGGED, POST_ADDRESS, POST_DOG, USER_LOGOUT } from "../actions";

const initialState = {
	user: "",
	commenti: [],
	preferiti: [],
	// address: "",
};

const myProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_LOGGED:
			return {
				...state,
				user: action.payload,
			};
		case USER_LOGOUT:
			return {
				...state,
				user: "",
			};
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

		case GET_COMMENTI:
			return {
				...state,
				commenti: action.payload,
			};
		case GET_PREFERITI:
			return {
				...state,
				preferiti: action.payload,
			};
		default:
			return state;
	}
};

export default myProfileReducer;
