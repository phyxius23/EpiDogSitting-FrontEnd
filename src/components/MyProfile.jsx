import { Col, Container, Image, Row } from "react-bootstrap";
import imgUser from "../assets/images/imgUser.jpg";
import AddAddressForm from "./AddAddressForm";
import AddDogForm from "./AddDogForm";
import { useSelector } from "react-redux";

const MyProfile = () => {
	const dogowner = useSelector((state) => state.myProfile.user);

	return (
		<Container className="mt-3 mb-4 mb-lg-0 dogsitter-detail">
			{/* FOTO, NOME, CITTÀ CAP */}
			<Row className="justify-content-center align-items-center intro">
				<Col sm={3}>
					<Image src={imgUser} roundedCircle fluid />
				</Col>
				<Col sm={7}>
					<h1 className="display-3" style={{ lineHeight: 1, marginTop: "-6px" }}>
						{dogowner.name}
					</h1>
					<p>Città, CAP</p>
				</Col>
			</Row>

			{/* FORM ADDRESS */}
			{!dogowner.address && <AddAddressForm />}

			{/* FORM DOG */}
			{dogowner.address && dogowner.dogs.length === 0 && <AddDogForm />}

			{/* ADDRESS + DOG */}
			{dogowner.address && dogowner.dogs.length > 0 && (
				<>
					<Row className="justify-content-center mt-3 address">
						<Col sm={10}>
							<div className="mb-0">
								<h4 className="font-weight-bold">INDIRIZZO:</h4>
								<div className="d-flex justify-content-between">
									<p className="mb-0">
										{dogowner.address.street}, {dogowner.address.city} - {dogowner.address.province} - {dogowner.address.postalCode}
									</p>
								</div>
							</div>
						</Col>
					</Row>
					<Row className="justify-content-center mt-3 dog">
						<Col sm={10}>
							<div className="lead mb-0">
								<h4 className="font-weight-bold">I MIEI PELOSI:</h4>
								<Row className="">
									<Col xs={4} className="dog-card me-3">
										<p className="mb-0">Nome</p>
										<p className="mb-0">Età</p>
										<p className="mb-0">Razza</p>
										<p className="mb-0">Peso</p>
										<p className="mb-0">Descrizione</p>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};
export default MyProfile;