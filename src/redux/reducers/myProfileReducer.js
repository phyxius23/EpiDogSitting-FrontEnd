import { GET_USER_LOGGED, GET_USER_ERROR, GET_USER_LOADING_ON, GET_USER_LOADING_OFF, POST_ADDRESS, POST_DOG, USER_LOGOUT, POST_IMAGE, POST_IMAGE_DOG, REMOVE_DOG, REMOVE_IMAGE_DOG } from "../actions";

const initialState = {
	user: "",
	isLoading: false,
	hasError: false,
	errorMessage: "",
};

const myProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_LOGGED:
			return {
				...state,
				user: action.payload,
			};
		case GET_USER_ERROR:
			return {
				...state,
				hasError: true,
				errorMessage: action.payload,
			};
		case GET_USER_LOADING_ON:
			return {
				...state,
				isLoading: true,
			};
		case GET_USER_LOADING_OFF:
			return {
				...state,
				isLoading: false,
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
		case REMOVE_DOG:
			return {
				...state,
				user: {
					...state.user,
					dogs: state.user.dogs.filter((dog) => dog.id !== action.payload),
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
		case REMOVE_IMAGE_DOG:
			return {
				...state,
				user: {
					...state.user,
					dogs: state.user.dogs.map((dog) => {
						if (dog.id === action.payload) {
							return {
								...dog,
								image: null,
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
