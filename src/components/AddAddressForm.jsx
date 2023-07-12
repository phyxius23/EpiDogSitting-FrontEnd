import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postAddressAction } from "../redux/actions";

const AddAddressForm = () => {
	const dogowner = useSelector((state) => state.myProfile.user);
	const dispatch = useDispatch();

	const [address, setAddress] = useState({
		street: "",
		city: "",
		province: "",
		postalCode: "",
	});

	const sendAddress = (e) => {
		e.preventDefault();
		dispatch(postAddressAction(dogowner.id, address));

		setAddress({
			street: "",
			city: "",
			province: "",
			postalCode: "",
		});
	};

	return (
		<Row className="justify-content-center mt-3 address">
			<Col sm={6}>
				<Form className=" rounded form-register" onSubmit={sendAddress}>
					<Form.Group className="mb-3">
						<Form.Label>Via</Form.Label>
						<Form.Control required type="text" className="" placeholder="Inserisci la via" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Città</Form.Label>
						<Form.Control required type="text" className="input-login" placeholder="Inserisci la città" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Provincia</Form.Label>
						<Form.Control
							required
							type="text"
							className=""
							placeholder="Inserisci la provincia"
							value={address.province}
							onChange={(e) => setAddress({ ...address, province: e.target.value })}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>CAP</Form.Label>
						<Form.Control required type="text" className="" placeholder="Inserisci il CAP" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
					</Form.Group>

					<div className="d-flex justify-content-end">
						<Button
							className="border-0"
							style={{
								backgroundColor: "#452103",
							}}
							type="submit">
							Salva indirizzo
						</Button>
					</div>
				</Form>
			</Col>
		</Row>
	);
};
export default AddAddressForm;