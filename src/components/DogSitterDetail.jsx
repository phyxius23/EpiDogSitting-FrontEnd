import { Button, Col, Image, Row } from "react-bootstrap";
import imgUser from "../assets/images/imgUser.jpg";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "./ModalContactForm";
import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { addFavoriteAction, removeFavoriteAction } from "../redux/actions";

const DogSitterDetail = () => {
	const dogsitter = useSelector((state) => state.dogSitterSelected.content);
	const dogOwner = useSelector((state) => state.myProfile.user);
	const favorites = useSelector((state) => state.favorites.content);
	const hasFetchError = useSelector((state) => state.dogSitters.hasError);
	const dispatch = useDispatch();

	// modal
	const [show, setShow] = useState(false);
	const handleCloseModal = () => setShow(false);
	const handleShowModal = () => setShow(true);

	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		setIsFavorite(
			favorites.find((favorite) => {
				return favorite.dogSitter === dogsitter.id;
			})
		);
	}, [dogsitter]);

	const saveFavorite = () => {
		setIsFavorite(true);

		dispatch(addFavoriteAction(dogOwner.id, dogsitter.id));
	};

	const removeFavorite = () => {
		setIsFavorite(false);

		const favoriteId = favorites.find((favorite) => {
			return favorite.dogSitter === dogsitter.id;
		});

		dispatch(removeFavoriteAction(favoriteId.id));
	};

	return (
		<div className="mt-3 mb-4 mb-lg-0 dogsitter-detail">
			{
				dogsitter && (
					<>
						{/* FOTO, NOME, CITTÀ CAP */}
						<Row className="align-items-center intro">
							<Col sm={3}>
								<Image src={imgUser} roundedCircle fluid />
							</Col>
							<Col sm={9} className="position-relative">
								<h1 className="display-3" style={{ lineHeight: 1, marginTop: "-6px" }}>
									{dogsitter.name}
								</h1>
								<p>
									{dogsitter.address.city}, {dogsitter.address.postalCode}
								</p>
								{/* AGGIUNGO ICONA PREFERITI DIVERSIFICATA */}
								{isFavorite ? (
									<div className="favoriteIcon" onClick={removeFavorite}>
										<IoHeartSharp />
									</div>
								) : (
									<div className="favoriteIcon" onClick={saveFavorite}>
										<IoHeartOutline />
									</div>
								)}
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
									{dogsitter.offerings.map((service) => (
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
							<Col className="d-flex justify-content-end">
								<Button onClick={handleShowModal} variant="secondary" className="mt-3">
									<span>Contatta il dogsitter</span>
								</Button>
								<ContactForm show={show} handleCloseModal={handleCloseModal} />
							</Col>
						</Row>
					</>
				)
				// : (
				// 	<Row>
				// 		<Col sm={12}>
				// 			<h3 className="display-6">{!hasFetchError ? "👈Seleziona un DogSitter!" : "Qualcosa è andato storto"}</h3>
				// 		</Col>
				// 	</Row>
				// )
			}
		</div>
	);
};
export default DogSitterDetail;
