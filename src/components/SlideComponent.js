import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "../index.css";

function SlideComponent({ slide1, slide2, slide, removeSlide }) {
  console.log(window.innerWidth);
  // console.log(slide1.length);
  const windowWidth = (data) => {
    if (data <= 425) {
      return 1;
    } else if (data <= 768) {
      return 3;
    } else if (data <= 1024) {
      return 4;
    } else {
      return 5;
    }
  };

  return (
    <>
      {slide ? (
        <>
          <div className="containerSlider">
            <Carousel itemsToShow={windowWidth(window.innerWidth)}>
              {slide1.map((item, i) => (
                <Item key={i}>
                  <div className="image-container">
                    <img src={item.images[0].imageurl} alt="img" />
                  </div>
                  {/* <div>{item.rating * "&#10025"}</div> */}
                  <div>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {new Date(item.calendardatetime).toDateString()}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "black",
                      }}
                    >
                      {item.text.slice(0, 40)}...
                    </p>
                  </div>
                </Item>
              ))}
            </Carousel>
          </div>
          <div>
            <button
              style={{ position: "relative", zIndex: 15 }}
              onClick={removeSlide}
            >
              CLOSE
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
export default SlideComponent;
