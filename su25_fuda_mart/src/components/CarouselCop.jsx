import CarouselImage from "./CarouselImage";
import Carousel from "react-bootstrap/Carousel";
import picture1 from "../assets/picture1.jpg";
import picture2 from "../assets/picture2.jpg";
import picture3 from "../assets/picture3.jpg";

const CarouselCop = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <CarouselImage imageSrc={picture1} text="Sườn non heo thảo mộc" />
          <Carousel.Caption>
            <h3>Sườn non heo thảo mộc</h3>
            <p>Thịt heo tươi ngon, được nuôi theo quy trình thảo mộc tự nhiên.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <CarouselImage imageSrc={picture2} text="Cá thu cắt lát" />
          <Carousel.Caption>
            <h3>Cá thu tươi cắt lát</h3>
            <p>Hải sản tươi sống, giàu dinh dưỡng cho bữa ăn gia đình.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <CarouselImage imageSrc={picture3} text="Tôm thẻ tươi" />
          <Carousel.Caption>
            <h3>Tôm thẻ tươi sống</h3>
            <p>
              Tôm tươi được đánh bắt và bảo quản trong ngày.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
export default CarouselCop;
