import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselHome = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./carousel/1920x1440_naviguez-sur-le-canal-de-nantes-a-brest-1675.jpg"
          alt="canal-de-nantes-a-brest"
        />
        <Carousel.Caption>
          <h3>Le port de Guenrouet</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./carousel/1.jpg"
          alt="canal-de-nantes-a-brest"
        />

        <Carousel.Caption>
          <h3>l'écluse de Melnoeuf</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./carousel/paysage-canal-5.jpg"
          alt="canal-de-nantes-a-brest"
        />

        <Carousel.Caption>
          <h3>Naviguez sur le canal</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHome;
