import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import DogSitterCard from "./DogSitterCard";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getSearchAction } from "../redux/actions";
import { toast } from "react-toastify";

const DogSitterList = () => {
	const dogSitters = useSelector((state) => state.dogSitters.content.content);
	const hasFetchError = useSelector((state) => state.dogSitters.hasError);
	const hasErrorMessage = useSelector((state) => state.dogSitters.errorMessage);

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

								{/* <h5>Seleziona CAP di riferimento:</h5> */}
								{/* <Form.Label>CAP</Form.Label> */}
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
						{dogSitters && dogSitters.map((dogSitter) => <DogSitterCard key={dogSitter.id} dogSitter={dogSitter} />)}
					</Row>
				</>
			)}
		</div>
	);
};
export default DogSitterList;
