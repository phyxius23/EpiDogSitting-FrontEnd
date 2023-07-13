import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import DogSitterCard from "./DogSitterCard";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getSearchAction } from "../redux/actions";

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

		console.log("reset!");

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
								<Form.Check.Label className="btn btn-secondary mb-2" htmlFor="passeggiata">
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
								<Form.Check.Label className="btn btn-secondary mb-2" htmlFor="asiloDiurno">
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
								<Form.Check.Label className="btn btn-secondary mb-3" htmlFor="pernottamento">
									Pernottamento
								</Form.Check.Label>

								<h5>Seleziona CAP di riferimento:</h5>
								<Form.Control
									type="text"
									placeholder="CAP"
									className="me-2 mb-2"
									aria-label="Search"
									value={query.postalCode}
									onChange={(e) => setQuery({ ...query, postalCode: e.target.value })}
								/>
								<Button variant="outline-success" type="submit" className="mb-2">
									Search
								</Button>
							</Form>
							<div className="btn btn-secondary d-block" onClick={sendReset}>
								Reset
							</div>
							{/* <div className="secondary" onClick={sendReset}>
								Reset
							</div> */}
						</Col>
					</Row>
					{dogSitters && dogSitters.map((dogSitter) => <DogSitterCard key={dogSitter.id} dogSitter={dogSitter} />)}
				</>
			)}
		</div>
	);
};
export default DogSitterList;
