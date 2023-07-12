import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
// import ImgProfile from "././public/image/user_undefined.webp"

const MyProfileDetail = () => {
	const address = useSelector((state) => state.myProfile.user.address);
	console.log(address);
	return (
		<Container>
			{/* RIGA FOTO E NOME PROFILO */}
			<Row className="justify-content-center align-items-center">
				<Col xs={4}>
					<Image src="image/user_undefined.webp" className="card-img img-fluid p-4" roundedCircle alt="profilo" />
				</Col>
				<Col xs={8}>
					<h1>Nome C.</h1>
					<p>Città, Regione</p>
					<Button>Contatta Nome</Button>
				</Col>
			</Row>

			{/* RIGA PREZZI SERVIZI E DESCRIZIONE PROFILO */}
			{}
			<Row className="justify-content-center">
				<Col xs={4} style={{ backgroundColor: "#ccc" }} className="">
					<Row>
						<Col>
							<h2>Servizi profilo</h2>
						</Col>
					</Row>
					<Row>
						<Col>
							<p>Tipo Servizio</p>
						</Col>
						<Col>
							<p>Prezzo Servizio</p>
						</Col>
					</Row>
				</Col>
				<Col xs={8} style={{ backgroundColor: "#efefef" }}>
					<h1>Descrizione profilo</h1>
				</Col>
			</Row>

			{/* RIGA COMMENTI PROFILO E CONTATTA */}
			<Row className="justify-content-center">
				<Col xs={12}>
					<h1>Commenti profilo con scorrimento orizzontale</h1>
				</Col>
				<Col xs={12} className="text-left">
					<Button>Contatta Profilo</Button>
				</Col>
			</Row>
		</Container>
	);
};
export default MyProfileDetail;
