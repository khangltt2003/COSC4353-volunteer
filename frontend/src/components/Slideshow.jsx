import { useState, useEffect } from "react";
import image1 from "../assets/bg2.jpg"; 
import image2 from "../assets/bg1.jpg"; 
import image3 from "../assets/bg2.jpeg"; 

const images = [image1, image2, image3];

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Changing image every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <img src={images[currentIndex]} alt="Slideshow" className="w-full h-full object-cover" />
      {/*navigation buttons for scrolling */}
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))}
        className="absolute top-1/2 left-2 bg-white p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))}
        className="absolute top-1/2 right-2 bg-white p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
}

export default Slideshow;
