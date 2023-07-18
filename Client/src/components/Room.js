import React, { useState } from "react";
import { Carousel, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, checkin, checkout }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <div key={room._id} className="shadow mb-4 p-3">
        <div className="row">
          <div className="col  d-flex">
            <div style={{ width: "40%" }}>
              <Carousel>
                {room.imageurls.map((url) => (
                  <Carousel.Item key={url}>
                    <img
                      className="d-block w-100 smallimg"
                      src={url}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="col-md-7">
              <h4 style={{ textAlign: "center" }}>
                <u>Room Name : {room.name}</u>
              </h4>

              <p>
                <b>Max Count : </b>
                {room.maxcount}
              </p>
              <p>
                <b>Phone Number : </b>
                {room.phonenumber}
              </p>
              <p>
                <b>Type : </b>
                {room.type}
              </p>
              <p>
                <b>Rent per Day : </b>Rs.
                {room.rentperday}/=
              </p>
            </div>
          </div>

          <div style={{ float: "center" }} className="my-4">
            {checkin && checkout && (
              <Link to={`/book/${room._id}/${checkin}/${checkout}`}>
                <button className="btn btn-primary m-2">Book Now</button>
              </Link>
            )}

            <button className="btn btn-primary" onClick={handleShow}>
              View Details
            </button>
          </div>

          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header>
              <Modal.Title>Room Number : {room.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Carousel>
                {room.imageurls.map((url) => (
                  <Carousel.Item key={url}>
                    <img
                      className="d-block w-100 bigimg"
                      src={url}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

              <p>{room.description}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Room;
