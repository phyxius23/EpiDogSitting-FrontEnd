export const GET_USER_LOGGED = "GET_USER_LOGGED";
export const USER_LOGOUT = "USER_LOGOUT";
export const GET_COMMENTI = "GET_COMMENTI";
export const GET_PREFERITI = "GET_PREFERITI";
export const POST_ADDRESS = "POST_ADDRESS";
export const POST_DOG = "POST_DOG";
export const POST_IMAGE = "POST_IMAGE";

export const SELECT_DOGSITTER = "SELECT_DOGSITTER";
export const GET_DOGSITTERS = "GET_DOGSITTERS";
export const GET_DOGSITTERS_ERROR = "GET_DOGSITTERS_ERROR";
export const GET_DOGSITTERS_LOADING_ON = "GET_DOGSITTERS_LOADING_ON";
export const GET_DOGSITTERS_LOADING_OFF = "GET_DOGSITTERS_LOADING_OFF";

/* ***** LOGOUT MY PROFILE => FUNZIONANTE ***** */
export const logoutAction = () => {
	localStorage.removeItem("token");

	return async (dispatch) => {
		dispatch({ type: USER_LOGOUT, payload: "" });
	};
};

/* ***** READ MY PROFILE => FUNZIONANTE ***** */
export const getUserLoggedAction = () => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/api/dogowner/me";

	return async (dispatch) => {
		try {
			let resp = await fetch(url, {
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});
			if (resp.ok) {
				let data = await resp.json();

				console.log(data);

				dispatch({ type: GET_USER_LOGGED, payload: data });
			} else {
				console.log("errore");
			}
		} catch (error) {
			console.log(error);
		}
	};
};

/* ***** SAVE ADDRESS => FUNZIONANTE ***** */
export const postAddressAction = (userId, addressData) => {
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

				dispatch({ type: POST_ADDRESS, payload: data });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

/* ***** SAVE DOG => FUNZIONANTE ***** */
export const postDogAction = (userId, dogData) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/api/dogowner/";

	return async (dispatch, getState) => {
		try {
			let resp = await fetch(url + userId + "/dog", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(dogData),
			});
			if (resp.ok) {
				let data = await resp.json();

				dispatch({ type: POST_DOG, payload: data });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

/* ***** SAVE IMAGE ***** => FUNZIONANTE */
export const postImageAction = (userId, imageData) => {
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

				dispatch({ type: POST_IMAGE, payload: data });
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

/* ***** ***** */
export const getPreferitiAction = () => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:3001/users/me/preferiti";
	return async (dispatch) => {
		try {
			let resp = await fetch(url, {
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${token}`,
				},
			});
			if (resp.ok) {
				let data = await resp.json();

				dispatch({ type: GET_PREFERITI, payload: data });
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

// metodo implementato da un vecchio progetto
// export const getSearchAction = (query) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await fetch(endpointSearch + query);

//       if (response.ok) {
//         let { data } = await response.json();
//         dispatch({type: GET_SEARCH, payload: data});
//       } else {
//         alert("Error fetching results");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
//  metodo implementato da un vecchio progetto con le modifiche necessarie al funzionamento in questo attuale
export const getSearchAction = (query) => {
	const token = localStorage.getItem("token");
	const url = "http://localhost:5001/dogsitters";
	// const url = "http://localhost:5001/dogsitters?page=&size=&sortBy=&postalCode=&name=&offeringType=";

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
	// const url = "http://localhost:5001/dogsitters?page=&size=&sortBy=&postalCode=&name=&offeringType=";

	// grazie a redux-thunk, che è un middleware GIA' INTEGRATO nel nostro flow con configureStore() di redux toolkit
	// possiamo creare degl iaction creators che ritornino non solo una singola action (oggetto JS), ma anche una funzione!
	return async (dispatch, getState) => {
		// getState() è una funzione che ritorna lo stato globale
		// console.log(url + "?page" + query.page + "?size" + query.size + "?sortBy" + query.sortBy + "?postalCode" + query.postalCode + "?name" + query.name + "?offeringType" + query.offeringType);
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
			//let resp = await fetch("http://localhost:5001/dogsitters");
			// console.log(resp);
			if (resp.ok) {
				let fetchedDogSitters = await resp.json();
				// a questo punto avremo aspettato la risoluzione della fetch e potremo fare il dispatch di un'action con fetchedBooks come payload!
				dispatch({ type: GET_DOGSITTERS, payload: fetchedDogSitters });
			} else {
				console.log("error");
				// siamo anche in grado di gestire errori nel caso in cui si presentino con un azione con type diverso
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
