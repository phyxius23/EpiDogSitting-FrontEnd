import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const images = [
	"https://picsum.photos/2000/3000",
	"https://picsum.photos/3000/2000",
	"https://picsum.photos/4000/3000",
	"https://picsum.photos/3000/1500",
	"https://picsum.photos/1000/2500",
	"https://picsum.photos/1500/2000",
	"https://picsum.photos/id/237/200/300",
];

const ReactImageGallery = () => {
	return (
		<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
			<Masonry gutter="20px">
				{images.map((image, i) => (
					<img key={i} src={image} style={{ width: "100%", display: "block" }} alt="" />
				))}
			</Masonry>
		</ResponsiveMasonry>
	);
};
export default ReactImageGallery;
