import { GET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE, FAVORITE_LOGOUT } from "../actions";

const initialState = {
	content: [],
};

const myFavoritesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_FAVORITES:
			return {
				...state,
				content: action.payload,
			};
		case ADD_FAVORITE:
			return {
				...state,
				content: [...state.content, action.payload],
			};
		case REMOVE_FAVORITE:
			return {
				...state,
				content: state.content.filter((favorite) => favorite.id !== action.payload),
			};
		case FAVORITE_LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default myFavoritesReducer;
