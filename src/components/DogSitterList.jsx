import { Alert, Button, Col, Form, Pagination, Row } from "react-bootstrap";
import DogSitterCard from "./DogSitterCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSearchAction } from "../redux/actions";
import { toast } from "react-toastify";

const DogSitterList = () => {
	const dogsitters = useSelector((state) => state.dogSitters.content);
	const hasFetchError = useSelector((state) => state.dogSitters.hasError);
	const hasErrorMessage = useSelector((state) => state.dogSitters.errorMessage);

	const arrayOfTotalPages = Array.from({ length: dogsitters.totalPages }, (_, index) => index + 1);

	const [query, setQuery] = useState({
		page: "",
		size: "",
		sortBy: "",
		postalCode: "",
		name: "",
		offeringType: "",
	});

	const dispatch = useDispatch();

	const sendQuery = (e) => {
		e.preventDefault();

		if (!isValidCap(query.postalCode)) {
			return toast.warning("Inserisci un CAP valido");
		}

		dispatch(getSearchAction(query));

		setQuery({
			page: "",
			size: "",
			sortBy: "",
			postalCode: "",
			name: "",
			offeringType: "",
		});
	};

	const sendReset = (e) => {
		e.preventDefault();

		setQuery({
			page: "",
			size: "",
			sortBy: "",
			postalCode: "",
			name: "",
			offeringType: "",
		});

		dispatch(getSearchAction(""));
	};

	useEffect(() => {
		dispatch(getSearchAction(query));
		// console.log("useEffect => query.page");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query.page]);

	const handleChangePage = (page) => {
		setQuery({ ...query, page: page - 1 });
	};

	// validazione del CAP
	const isValidCap = (cap) => {
		const capRegex = /^$|^[0-9]{5}$/;
		return capRegex.test(cap);
	};

	return (
		<div className="mb-3">
			{hasFetchError ? (
				<Alert variant="danger">{hasErrorMessage ? hasErrorMessage : "Qualcosa è andato storto"}</Alert>
			) : (
				<>
					<Row>
						<Col>
							<Form className="d-flex flex-column" onSubmit={sendQuery}>
								<h5>Seleziona un servizio:</h5>
								<Form.Check.Input
									type="radio"
									name="offeringType"
									value="PASSEGGIATA"
									onChange={(e) => setQuery({ ...query, offeringType: e.target.value })}
									className="btn-check"
									id="passeggiata"
								/>
								<Form.Check.Label className="btn btn-outline-warning mb-2" htmlFor="passeggiata">
									Passeggiata
								</Form.Check.Label>
								<Form.Check.Input
									type="radio"
									name="offeringType"
									value="ASILO_DIURNO"
									onChange={(e) => setQuery({ ...query, offeringType: e.target.value })}
									className="btn-check"
									id="asiloDiurno"
								/>
								<Form.Check.Label className="btn btn-outline-warning mb-2" htmlFor="asiloDiurno">
									Asilo diurno
								</Form.Check.Label>

								<Form.Check.Input
									type="radio"
									name="offeringType"
									value="PERNOTTAMENTO"
									onChange={(e) => setQuery({ ...query, offeringType: e.target.value })}
									className="btn-check"
									id="pernottamento"
								/>
								<Form.Check.Label className="btn btn-outline-warning mb-3" htmlFor="pernottamento">
									Pernottamento
								</Form.Check.Label>
								<Form.Label>
									<h5>Seleziona CAP di riferimento:</h5>
								</Form.Label>
								<Form.Control type="text" placeholder="CAP" value={query.postalCode} onChange={(e) => setQuery({ ...query, postalCode: e.target.value })} className="me-2 mb-2" />
								<Button type="submit" variant="warning" className="mb-2">
									Search
								</Button>
							</Form>
							<Button type="text" variant="secondary" className="d-block w-100" onClick={sendReset}>
								Reset
							</Button>
						</Col>
					</Row>
					<Row xs={2} md={1}>
						{dogsitters.content && dogsitters.content.map((dogsitter) => <DogSitterCard key={`dogsitterCard-${dogsitter.id}`} dogsitter={dogsitter} />)}
					</Row>
					{/* Pagination */}
					{dogsitters.totalPages > 1 && (
						<Row className="mt-3 pagination">
							<Col>
								<Pagination className="d-flex">
									{arrayOfTotalPages.map((page, index) => (
										<Pagination.Item key={index} active={index === dogsitters.pageable.pageNumber} onClick={() => handleChangePage(page)} className="col text-center shadow">
											{/* {console.log("index: " + index + "| pageable.number: " + dogsitters.pageable.pageNumber)} */}
											{page}
										</Pagination.Item>
									))}
								</Pagination>
							</Col>
						</Row>
					)}
				</>
			)}
		</div>
	);
};
export default DogSitterList;
