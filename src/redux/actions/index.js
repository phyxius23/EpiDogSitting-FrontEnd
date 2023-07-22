export const GET_USER_LOGGED = "GET_USER_LOGGED";
export const GET_USER_LOADING_ON = "GET_USER_LOADING_ON";
export const GET_USER_LOADING_OFF = "GET_USER_LOADING_OFF";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";

export const GET_COMMENTI = "GET_COMMENTI";

export const GET_FAVORITES = "GET_FAVORITES";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const FAVORITE_LOGOUT = "FAVORITE_LOGOUT";

export const POST_ADDRESS = "POST_ADDRESS";

export const POST_DOG = "POST_DOG";
export const REMOVE_DOG = "REMOVE_DOG";

export const POST_IMAGE = "POST_IMAGE";
export const POST_IMAGE_DOG = "POST_IMAGE_DOG";
export const REMOVE_IMAGE_DOG = "REMOVE_IMAGE_DOG";

export const SELECT_DOGSITTER = "SELECT_DOGSITTER";
export const DOGSITTER_SELECTED_LOGOUT = "DOGSITTER_SELECTED_LOGOUT";

export const GET_DOGSITTERS = "GET_DOGSITTERS";
export const DOGSITTERS_LOGOUT = "DOGSITTERS_LOGOUT";
export const GET_DOGSITTERS_ERROR = "GET_DOGSITTERS_ERROR";
export const GET_DOGSITTERS_LOADING_ON = "GET_DOGSITTERS_LOADING_ON";
export const GET_DOGSITTERS_LOADING_OFF = "GET_DOGSITTERS_LOADING_OFF";

/* ***** LOGOUT MY PROFILE => FUNZIONANTE ***** */
export const logoutAction = () => {
	localStorage.removeItem("token");

	return async (dispatch) => {
		dispatch({ type: USER_LOGOUT });
		dispatch({ type: FAVORITE_LOGOUT });
		dispatch({ type: DOGSITTER_SELECTED_LOGOUT });
		dispatch({ type: DOGSITTERS_LOGOUT });
	};
};

/* ***** READ MY PROFILE => FUNZIONANTE ***** */
export const getUserLoggedAction = (toast) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/api/dogowner/me";

	return async (dispatch) => {
		try {
			dispatch({ type: GET_USER_LOADING_ON });

			let resp = await fetch(url, {
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});
			if (resp.ok) {
				let data = await resp.json();

				toast.success("Utente loggato", { autoClose: 1000 });

				dispatch({ type: GET_USER_LOGGED, payload: data });
				dispatch({ type: GET_USER_LOADING_OFF });
			} else {
				console.log("errore");

				dispatch({ type: GET_USER_ERROR, payload: "Errore nel reperimento dei dati" });
			}
		} catch (error) {
			console.log(error);

			dispatch({ type: GET_USER_ERROR, payload: "Errore nel reperimento dei dati" });
			dispatch({ type: GET_USER_LOADING_OFF });
		}
	};
};

/* ***** SAVE ADDRESS => FUNZIONANTE ***** */
export const postAddressAction = (userId, addressData, toast) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/api/dogowner/";

	return async (dispatch, getState) => {
		try {
			let resp = await fetch(url + userId + "/address", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(addressData),
			});
			if (resp.ok) {
				let data = await resp.json();

				toast.success("Indirizzo inserito", { autoClose: 1000 });

				dispatch({ type: POST_ADDRESS, payload: data });
			} else {
				toast.error("Salvataggio non eseguito", { autoClose: 1000 });
			}
		} catch (error) {
			toast.error(error.message, { autoClose: 1000 });
		}
	};
};

/* ***** SAVE DOG => FUNZIONANTE ***** */
export const postDogAction = (dogId, dogData, toast) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/api/dogowner/";

	return async (dispatch, getState) => {
		try {
			let resp = await fetch(url + dogId + "/dog", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(dogData),
			});
			if (resp.ok) {
				let data = await resp.json();

				toast.success("Animale salvato");

				dispatch({ type: POST_DOG, payload: data });
			} else {
				toast.error("Salvataggio non eseguito");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
};

/* ***** REMOVE DOG ***** => FUNZIONANTE */
export const removeDogAction = (dogId, toast) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/dogs/";

	return async (dispatch, getState) => {
		try {
			let resp = await fetch(url + dogId, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});
			if (resp.ok) {
				toast.success("Animale cancellato");

				dispatch({ type: REMOVE_DOG, payload: dogId });
			} else {
				toast.error("Cancellazione non riuscita");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
};

/* ***** SAVE IMAGE PROFILE ***** => FUNZIONANTE */
export const postImageProfileAction = (userId, imageData, toast) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/api/dogowner/";

	return async (dispatch, getState) => {
		try {
			let resp = await fetch(url + userId + "/image/upload", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: imageData,
			});
			if (resp.ok) {
				let data = await resp.json();

				toast.success("Immagine salvata");

				dispatch({ type: POST_IMAGE, payload: data });
			} else {
				toast.error("Immagine non salvata");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
};

/* ***** SAVE IMAGE DOG ***** => FUNZIONANTE */
export const postImageDogAction = (dogId, toast, imageData) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/image/";

	return async (dispatch, getState) => {
		try {
			let resp = await fetch(url + dogId + "/image/upload", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: imageData,
			});
			if (resp.ok) {
				let data = await resp.json();

				toast.success("Immagine salvata");

				dispatch({
					type: POST_IMAGE_DOG,
					payload: {
						response: data,
						id: dogId,
					},
				});
			}
		} catch (error) {
			// console.log(error);
			toast.error("Salvataggio non eseguito");
		}
	};
};

/* ***** REMOVE IMAGE DOG ***** => FUNZIONANTE */
export const removeImageDogAction = (dog, toast) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/image/delete/";

	return async (dispatch, getState) => {
		try {
			let resp = await fetch(url + dog.image.id, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});
			if (resp.ok) {
				toast.success("Immagine eliminata");

				dispatch({ type: REMOVE_IMAGE_DOG, payload: dog.id });
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
};

/* ***** READ ALL FAVORITES ***** => FUNZIONANTE */
export const getFavoritesAction = (dogownerId) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/favorites/dogowner/";

	return async (dispatch) => {
		try {
			let resp = await fetch(url + dogownerId, {
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});
			if (resp.ok) {
				let data = await resp.json();

				dispatch({ type: GET_FAVORITES, payload: data });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

/* ***** ADD FAVORITE ***** => FUNZIONANTE */
export const addFavoriteAction = (dogownerId, dogsitterId) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/favorites/";

	return async (dispatch, getState) => {
		try {
			let resp = await fetch(url + dogownerId + "/" + dogsitterId, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});
			if (resp.ok) {
				let data = await resp.json();

				dispatch({ type: ADD_FAVORITE, payload: data });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

/* ***** REMOVE FAVORITE ***** => FUNZIONANTE */
export const removeFavoriteAction = (favoriteId) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/favorites/";

	return async (dispatch, getState) => {
		try {
			let resp = await fetch(url + favoriteId, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});
			if (resp.ok) {
				//let data = await resp.json();

				dispatch({ type: REMOVE_FAVORITE, payload: favoriteId });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

// *******************************************************

/* ***** ***** */
export const getCommentiAction = (url) => {
	const token = localStorage.getItem("token");
	// const url = "http://localhost:5001/comments";

	return async (dispatch) => {
		try {
			let resp = await fetch(url, {
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});
			if (resp.ok) {
				let commenti = await resp.json();

				dispatch({ type: GET_COMMENTI, payload: commenti });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

/**
 * DOGSITTERS ACTION
 */
export const selectDogSittersAction = (dogSitter) => ({ type: SELECT_DOGSITTER, payload: dogSitter });

//  metodo implementato da un vecchio progetto con le modifiche necessarie al funzionamento in questo attuale
export const getSearchAction = (query) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/dogsitters";

	return async (dispatch, getState) => {
		try {
			dispatch({
				type: GET_DOGSITTERS_LOADING_ON,
			});

			let resp = await fetch(
				url +
					"?page=" +
					(query.page ? query.page : "") +
					"&size=" +
					(query.size ? query.size : "") +
					"&sortBy=" +
					(query.sortBy ? query.sortBy : "") +
					"&postalCode=" +
					(query.postalCode ? query.postalCode : "") +
					"&name=" +
					(query.name ? query.name : "") +
					"&offeringType=" +
					(query.offeringType ? query.offeringType : ""),
				{
					method: "GET",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (resp.ok) {
				let fetchedDogSitters = await resp.json();

				dispatch({ type: GET_DOGSITTERS, payload: fetchedDogSitters });
			} else {
				alert("Error fetching results");

				dispatch({
					type: GET_DOGSITTERS_ERROR,
					payload: "Errore nel reperimento dei dati",
				});
			}
		} catch (error) {
			console.log(error);

			dispatch({
				type: GET_DOGSITTERS_ERROR,
				payload: "Errore nel reperimento dei dati: " + error.message,
			});
		} finally {
			// siamo anche in grado di gestire loading states leggibili e attivabili/disattivabili in tutta l'applicazione dall'unico posto che è questo action creator
			dispatch({
				type: GET_DOGSITTERS_LOADING_OFF,
			});
		}
	};
};

export const getDogSittersAction = () => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/dogsitters";

	return async (dispatch, getState) => {
		try {
			dispatch({
				type: GET_DOGSITTERS_LOADING_ON,
			});
			let resp = await fetch(url, {
				method: "GET",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});
			if (resp.ok) {
				let fetchedDogSitters = await resp.json();
				dispatch({ type: GET_DOGSITTERS, payload: fetchedDogSitters });
			} else {
				console.log("error");
				dispatch({
					type: GET_DOGSITTERS_ERROR,
					payload: "Errore nel reperimento dei dati",
				});
			}
		} catch (error) {
			console.log(error);

			dispatch({
				type: GET_DOGSITTERS_ERROR,
				payload: "Errore nel reperimento dei dati: " + error.message,
			});
		} finally {
			dispatch({
				type: GET_DOGSITTERS_LOADING_OFF,
			});
		}
	};
};

/**
 * DOGOWNER ACTION
 */
// export const postDogOwnerAction = (dogOwnerData) => {
// 	const token = localStorage.getItem("token");
// 	const url = "http://localhost:5001/auth/register/dogowners";

// 	return async (dispatch, getState) => {
// 		try {
// 			let resp = await fetch(url, {
// 				method: "POST",
// 				body: JSON.stringify(dogOwnerData),
// 				headers: {
// 					"Content-type": "application/json; charset=UTF-8",
// 					Authorization: `Bearer ${token}`,
// 				},
// 			});
// 			if (resp.ok) {
// 				let data = await resp.json();

// 				dispatch({ type: POST_DOGOWNER, payload: data });
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// };
