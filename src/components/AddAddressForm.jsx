import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postAddressAction } from "../redux/actions";
import { toast } from "react-toastify";

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

		if (!isValidCap(address.postalCode)) {
			return toast.warning("Inserisci un CAP valido");
		}

		dispatch(postAddressAction(dogowner.id, address, toast));

		setAddress({
			street: "",
			city: "",
			province: "",
			postalCode: "",
		});
	};

	// validazione del CAP
	const isValidCap = (cap) => {
		const capRegex = /^$|^[0-9]{5}$/;
		return capRegex.test(cap);
	};

	return (
		<Row className="justify-content-center mt-3 address">
			<Col xs={6}>
				<Form className=" rounded form-register" onSubmit={sendAddress}>
					<Form.Group className="mb-3">
						<Form.Label>Via</Form.Label>
						<Form.Control type="text" placeholder="Inserisci la via" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} required />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Città</Form.Label>
						<Form.Control type="text" className="input-login" placeholder="Inserisci la città" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Provincia</Form.Label>
						<Form.Control
							type="text"
							pattern="(^[A-Z]{2}$)"
							placeholder="Inserisci la provincia"
							value={address.province}
							onChange={(e) => setAddress({ ...address, province: e.target.value })}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>CAP</Form.Label>
						<Form.Control type="number" placeholder="Inserisci il CAP" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} required />
					</Form.Group>

					<div className="d-flex justify-content-end">
						<Button type="submit" variant="warning" className="border-0">
							Salva indirizzo
						</Button>
					</div>
				</Form>
			</Col>
		</Row>
	);
};
export default AddAddressForm;
