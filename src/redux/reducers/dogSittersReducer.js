import { GET_DOGSITTERS, GET_DOGSITTERS_ERROR, GET_DOGSITTERS_LOADING_OFF, GET_DOGSITTERS_LOADING_ON, DOGSITTERS_LOGOUT } from "../actions";

const initialState = {
	content: [],
	isLoading: false,
	hasError: false,
	errorMessage: "",
};

const dogSittersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DOGSITTERS:
			return {
				...state,
				content: action.payload,
			};
		case GET_DOGSITTERS_ERROR:
			return {
				...state,
				hasError: true,
				errorMessage: action.payload,
			};
		case GET_DOGSITTERS_LOADING_ON:
			return {
				...state,
				isLoading: true,
			};
		case GET_DOGSITTERS_LOADING_OFF:
			return {
				...state,
				isLoading: false,
			};
		case DOGSITTERS_LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default dogSittersReducer;
