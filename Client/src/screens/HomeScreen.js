import React from "react";
import { Carousel } from "react-bootstrap";
import "../styles/Home.css";

function HomeScreen() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="c-block w-100"
            src="https://ssl.tzoo-img.com/images/tzoo.hd.14824.181.101121.RoyalGardenHotel.jpg?v=3"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Royal Garden</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="c-block w-100"
            src="https://tatilsepeti.cubecdn.net/Files/TesisResim/03045/tsr03045636252603735896197.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="c-block w-100"
            src="https://s-ec.bstatic.com/images/hotel/max1024x768/175/17513397.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Food coner</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="c-block w-100"
            src="https://thecollectionevents.com/wp-content/uploads/2019/02/20161027_172053-900x576.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Fifth slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <hr />
      {/* About */}
      <section id="about" class="sec">
        <div class="sec_outer">
          <span class="title-section">
            <h1><u>About Us</u></h1>
          </span>
          <div class="sec_inner">
            <p>
              Royal Garden is a fully functional banquet which is renowned as
              one of the most popular special occasion facilities situated in
              Dompe, Sri Lanka. Royal Garden gives you a magnificent banqueting
              experience along with outstanding service and hospitality. Plan
              the most memorable day in your life and we at Mihirna will make
              sure that you celebrate it with absolute elegance. Our luxury
              banqueting experience is not limited only to orchestrate Wedding
              Ceremonies but also Conferences, Cocktails, Birthday Parties and
              Fine Dining Parties.
            </p>
            <p>
              Royal Garden welcomes you to experience the warmth of our royal
              hospitality and take home golden memories to treasure a lifetime .
            </p>
          </div>
          <div className="row mt-5 bs">
            <div className="col-md-3">
              <img
                src="http://mihirnabanquethall.com/images/abt1.jpg"
                class="js-image about-imgs"
              />
              <img
                src="http://mihirnabanquethall.com/images/abt2.jpg"
                class="js-image about-imgs"
              />
            </div>
            <div className="col-md-3">
              <img
                src="http://mihirnabanquethall.com/images/abt3.jpg"
                class="js-image about-imgs"
              />
              <img
                src="http://mihirnabanquethall.com/images/abt4.jpg"
                class="js-image about-imgs"
              />
            </div>
          </div>
        </div>
      </section>
      <hr/>
      {/* Services */}
      <section id="services" class="sec">
        <div class="sec_outer">
          <span class="title-section">
            <h1><u>What we offer</u></h1>
          </span>
          <div class="sec_inner">
            <div class="slide" id="slide1">
            <div className="row mt-2 bs">
                  <div className="col-md-3">
              <div class="text-container">
                <h2>Banquet Hall</h2>
                
                    <p>
                      Royal Garden Banquet is a lavish event space where you can
                      celebrate the most memorable day in your life while making
                      golden memories. This majestic banquet can hold up to 500
                      guests at once and will give you a once in a life time
                      luxurious banqueting experience. Our experienced staff at
                      Mihirna will make sure that you fulfill all your
                      expectations in a grand scale. Mihirna Banquet Hall
                      additionally provides spaces to hold Engagements,
                      Conferences, Birthday Parties, etc.
                    </p>
                  </div>
                  
                  </div>
                  <div className="col-md-3">
                    <div class="image-container">
                      <img src="http://mihirnabanquethall.com/images/serv1.jpg" class="js-image" />
                    </div>

                </div>
              </div>
            </div>
            <div class="slide" id="slide2">
              <div class="text-container">
                <h2>On Location Photography</h2>
                <p>
                  Mihirna Banquet is committed to ensuring the most memorable
                  day in your life is absolutely perfect. Outdoor location of
                  Mihirna offers you a stunning landscape with modern
                  architectural feats for outstanding photography. This is the
                  place where your dreams become a reality. Our on location
                  photographs will narrate your beautiful story for the
                  generations to come.
                </p>
              </div>
              <div class="image-container">
                <img
                  src="http://mihirnabanquethall.com/images/serv2.jpg"
                  class="js-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr/>
      {/* Terms */}
      <section id="tc" class="sec">
        <div class="sec_outer">
          <span class="title-section">
            <h1><u>COMPLIMENTARY SERVICES</u></h1>
          </span>
          <div class="tc-sec_inner">
            <div class="service-box">
              <h2>Complimentary Services</h2>
              <div class="outer">
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/1.png" />
                  <h3>A room for dressing purposes on Reception Day.</h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/2.png" />
                  <h3>
                    A room for dancing group dressing purposes on Reception Day.
                  </h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/3.png" />
                  <h3>
                    Standard Flower Arrangements (Poruwa, Settee Back, Oil Lamp,
                    etc.).
                  </h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/4.png" />
                  <h3>Traditional oil lamp (On Request).</h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/5.png" />
                  <h3>A skirted table for Cake Structure.</h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/6.png" />
                  <h3>
                    Silver Platters/Baskets for Serving Cake (On Request).
                  </h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/7.png" />
                  <h3>
                    Use of our site for Photography and Videography (Conditions
                    Apply).
                  </h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/8.png" />
                  <h3>Registration Table</h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/9.png" />
                  <h3>A dedicated coordinator from the management.</h3>
                </div>
              </div>
            </div>
            <div class="service-box">
              <h2>Services can be arranged</h2>
              <div class="outer">
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/21.png" />
                  <h3>Customized Flower Arrangements.</h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/22.png" />
                  <h3>Live Band/ DJ Music.</h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/23.png" />
                  <h3>Dancing Groups.</h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/24.png" />
                  <h3>Champagne / Milk Fountain</h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/25.png" />
                  <h3>Luxurious Cars</h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/26.png" />
                  <h3>Wedding Cake &amp; Structures.</h3>
                </div>
                <div class="serv-b">
                  <img class="service-icon " src="http://mihirnabanquethall.com/images/icons/27.png" />
                  <h3>Photography &amp; Videography.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr/>
      </section>
      {/* Gallery */}
      <section id="gallery" class="sec">
        <div class="sec_outer">
          <h1>Gallery</h1>
          <div class="sec_inner">
            <div class="main_sec">
              <ul class="row first">
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/1.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/2.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/3.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/4.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/5.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/6.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/7.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/8.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/9.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/10.jpg" />
                </li>
                
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/12.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/13.jpg" />
                </li>
                
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/16.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/17.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/18.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/19.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/20.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/21.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/22.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/23.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/24.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/25.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/26.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/27.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/28.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/29.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/30.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/31.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/32.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/33.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/34.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/35.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/36.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/37.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/38.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/39.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/40.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/41.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/42.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/43.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/44.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/45.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/46.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/47.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/48.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/49.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/50.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/51.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/52.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/53.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/54.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/55.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/56.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/57.jpg" />
                </li>
                
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/59.jpg" />
                </li>
                <li>
                  <img src="http://mihirnabanquethall.com/images/gallery/60.jpg" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <hr/>
      {/* Contact us */}
      <section id="contact" class="sec">
        <div class="sec_outer">
        <span class="title-section">
            <h1><u>Contact Us</u></h1>
        </span>
          <div class="sec_inner-contact">
            <div class="row bs">
              <div class="col-md-6 center">
                <h4>Address</h4>
                <p>No 4C, Galakona, Dompe</p>
                <h4>Landline</h4>
                <p>+94 33 2 259 293</p>
                <p>+94 33 7 212 062</p>
                <h4>Hotline</h4>
                <p>+94 77 7 935 245</p>
                <p>+94 77 8 913 636</p>
                <h4>Email</h4>
                <p>info@royalgardenquethall.com</p>
                <div class="social-media">
                  <a
                    href="https://www.facebook.com/mihirnabanquet/"
                    target="_blank"
                  >
                    <i class="fab fa-facebook" aria-hidden="true"></i>
                  </a>
                  <a href="" target="_blank">
                    <i class="fab fa-instagram" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;
