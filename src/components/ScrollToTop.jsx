import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation(); // Get current route path

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll to top
  }, [pathname]); // Run effect when pathname changes

  return null; // This component does not render anything
}

export default ScrollToTop;
