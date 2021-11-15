import { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

export interface SliderComponentProps {
  images: string[];
  className?: string;
}

function SliderComponents(props: SliderComponentProps) {
  const mainSlider = useRef<Splide>(null);
  const subSlider = useRef<Splide>(null);

  useEffect(() => {
    subSlider.current &&
      subSlider.current.splide &&
      mainSlider.current?.sync(subSlider.current.splide);
  }, []);

  return (
    <div className={`w-10/12 h-2/6 ${props.className}`}>
      <Splide
        ref={mainSlider}
        className="mb-2"
        options={{
          type: "loop",
          perPage: 1,
          perMove: 1,
          gap: "1rem",
          pagination: false,
          arrows: false,
          width: "100%",
          height: "700px",
          cover: true,
        }}
      >
        {props.images.map((image, index) => (
          <SplideSlide key={index}>
            <img src={image} alt={`${index + 1} imagem`} />
          </SplideSlide>
        ))}
      </Splide>
      <Splide
        ref={subSlider}
        className="sub-slider"
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
        {props.images.map((image, index) => (
          <SplideSlide key={index}>
            <img src={image} alt={`${index + 1} imagem`} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default SliderComponents;
