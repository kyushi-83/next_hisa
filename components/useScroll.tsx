import { useState, useEffect, useContext, useRef} from 'react'

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const PositionUp = () => {
      setScrollPosition(window.scrollY);
    }
    window.addEventListener("scroll", PositionUp);
    PositionUp();
    return () => window.removeEventListener("scroll", PositionUp);
  }, [scrollPosition]);
  return scrollPosition;
};

export default useScroll;