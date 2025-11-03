
import Image from "react-bootstrap/Image";

const CarouselImage = ({ text, imageSrc }) => { 
  return (
    <Image src={imageSrc} alt={text} fluid style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }} /> // Sử dụng imageSrc
  );
};

export default CarouselImage;