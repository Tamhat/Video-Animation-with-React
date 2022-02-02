import { useEffect, useRef, useLayoutEffect, useCallback } from "react";
import getImagePath from "../utils/getImagePath";
import "../styles/animate.css";

const Animate = () => {
  const canvasDom = useRef(0);
  const imagesCount = 78;

  useLayoutEffect(() => {
    const canvas = canvasDom.current;
    const context = canvas.getContext("2d");
    canvas.width = 1250;
    canvas.height = 1440;

    const img = new Image();
    img.src = getImagePath(1);
    img.onload = () => {
      context.drawImage(img, 0, 0);
    };
  }, []);

  const scrollAnimation = useCallback(() => {
    const canvas = canvasDom.current;
    const context = canvas.getContext("2d");
    const html = document.documentElement;

    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;

    const frameIndex = Math.min(
      imagesCount - 1,
      Math.ceil(scrollFraction * imagesCount)
    );

    const updateImage = (index) => {
      const img = new Image();
      img.src = getImagePath(index);
      context.drawImage(img, 0, 0);
    };

    requestAnimationFrame(() => updateImage(frameIndex + 1));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollAnimation);
    return () => window.removeEventListener("scroll", scrollAnimation);
  }, []);

  return (
  <canvas  ref={canvasDom}/>
  );
};

export default Animate;
