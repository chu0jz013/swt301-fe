import Carousel from "react-bootstrap/Carousel";
import bg1 from "./images/bg1.jpg";
import bg2 from "./images/bg2.jpg";
import bg3 from "./images/bg3.jpg";
import bg4 from "./images/bg4.jpg";

function CarouselHeader() {
  const h5Content = (
    <span
      style={{
        fontSize: "48px",
        border: "5px solid #fff",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "15px",
      }}
    >
      KTX ĐẠI HỌC FPT
    </span>
  );
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <div style={{ height: "80vh" }}>
          <img className="d-block w-100" src={bg1} alt="First slide" />
        </div>
        <Carousel.Caption>
          {h5Content}
          <h2 style={{ margin: "10px" }}>Không gian sống xanh</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ height: "80vh" }}>
          <img className="d-block w-100" src={bg2} alt="Second slide" />
        </div>
        <Carousel.Caption>
          {h5Content}
          <h2 style={{ margin: "10px" }}>Kiến trúc hiện đại</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ height: "80vh" }}>
          <img className="d-block w-100" src={bg3} alt="Third slide" />
        </div>
        <Carousel.Caption>
          {h5Content}
          <h2 style={{ margin: "10px" }}>Đảm bảo an ninh</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ height: "80vh" }}>
          <img className="d-block w-100" src={bg4} alt="Third slide" />
        </div>
        <Carousel.Caption>
          {h5Content}
          <h2 style={{ margin: "10px" }}>Đầy đủ tiện nghi</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHeader;
