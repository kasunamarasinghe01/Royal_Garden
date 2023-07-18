import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";
import { Carousel, Button } from "react-bootstrap";

function LandingScreen() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="a-block w-100"
            src="https://artofliving.lk/wp-content/uploads/2019/04/51936858_1836588189781246_5125343813308514304_n.jpg"
            alt=""
          />
          <Carousel.Caption>
            <div className="row">
              <div className="col-md -12">
                <h1>Royal Garden Hotel</h1>
                <h5>"There is only one boss. The Guest."</h5>
                <Link to="/home">
                  <Button variant="dark">Get Start</Button>
                </Link>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default LandingScreen;
