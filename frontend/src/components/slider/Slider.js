import { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

function SliderComponents({ images, className }) {
  const mainSlider = useRef(null);
  const subSlider = useRef(null);

  useEffect(() => {
    mainSlider.current.sync(subSlider.current.splide);
  }, []);

  return (
    <div>
      <Splide
        ref={mainSlider}
        options={{
          type: "loop",
          perPage: 1,
          perMove: 1,
          gap: "1rem",
          pagination: false,
          arrows: false,
        }}
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <img src={image} alt={`${index + 1} imagem`} />
          </SplideSlide>
        ))}
      </Splide>
      <Splide
        ref={subSlider}
        options={{
          type: "slide",
          rewind: true,
          gap: ".5rem",
          pagination: false,
          fixedWidth: 70,
          fixedHeight: 70,
          arrows: false,
          cover: true,
          focus: "center",
          isNavigation: true,
          updateOnMove: true,
        }}
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <img src={image} alt={`${index + 1} imagem`} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default SliderComponents;
