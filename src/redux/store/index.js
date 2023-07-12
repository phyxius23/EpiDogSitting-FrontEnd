import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import myProfileReducer from "../reducers/myProfileReducer.js";
import dogSitterSelectedReducer from "../reducers/dogSitterSelectedReducer.js";
import dogSittersReducer from "../reducers/dogSittersReducer.js";
// import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
	key: "root",
	storage,
	// transforms: [
	// 	encryptTransform({
	// 		secretKey: process.env.REACT_APP_PERSIST_KEY,
	// 	}),
	// ],
};

const rootReducer = combineReducers({
	myProfile: myProfileReducer,
	dogSitterSelected: dogSitterSelectedReducer,
	dogSitters: dogSittersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// const rootReducer = combineReducers({
// 	home: homeReducer,
// });

// const store = configureStore({
// 	reducer: rootReducer,
// });

// export default store;
