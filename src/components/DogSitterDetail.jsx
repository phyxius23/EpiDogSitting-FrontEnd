import { Col, Image, Row } from "react-bootstrap";
import imgUser from "../assets/images/imgUser.jpg";
import { useSelector } from "react-redux";
import ContactForm from "./ContactForm";

const DogSitterDetail = () => {
	//const dispatch = useDispatch();
	const dogSitterSelected = useSelector((state) => state.dogSitterSelected.content);
	//const userName = useSelector((state) => state.user.content);
	const hasFetchError = useSelector((state) => state.dogSitters.hasError);

	return (
		<div className="mt-3 mb-4 mb-lg-0 dogsitter-detail">
			{dogSitterSelected ? (
				<>
					{/* FOTO, NOME, CITTÀ CAP */}
					<Row className="align-items-center intro">
						<Col sm={3}>
							<Image src={imgUser} roundedCircle fluid />
						</Col>
						<Col sm={9}>
							<h1 className="display-3" style={{ lineHeight: 1, marginTop: "-6px" }}>
								{dogSitterSelected.name}
							</h1>
							<p>
								{dogSitterSelected.address.city}, {dogSitterSelected.address.postalCode}
							</p>
						</Col>
					</Row>
					{/* DESCRIZIONE */}
					<Row className="mt-3 description">
						<Col sm={12}>
							<p className="lead">
								<span className="font-weight-bold">Description: </span>
								<span>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur minima et quae tempora sequi assumenda officia. Ducimus dolores officiis voluptatem, magnam
									maxime aut dolorem iure. Ea beatae sint repellat!
								</span>
							</p>
						</Col>
					</Row>

					{/* SERVIZI */}
					<Row className="mt-3 service">
						<Col sm={12}>
							<div className="mb-0">
								<h4 className="font-weight-bold">SERVIZI:</h4>
								{dogSitterSelected.offerings.map((service) => (
									<div className="d-flex justify-content-between mb-2" key={service.id}>
										<p>{service.type}</p>
										<p>€ {service.price}</p>
									</div>
								))}
							</div>
						</Col>
					</Row>

					{/* CONTACT FORM */}
					<Row>
						<Col>
							<ContactForm />
						</Col>
					</Row>
				</>
			) : (
				<Row>
					<Col sm={12}>
						<h3 className="display-6">{!hasFetchError ? "👈Seleziona un DogSitter!" : "Qualcosa è andato storto"}</h3>
					</Col>
				</Row>
			)}

			{/* <Button variant="primary">ADD TO CART</Button> */}
		</div>
	);
};
export default DogSitterDetail;
