import { Outlet, useLocation, useParams } from "react-router-dom";
import DisplayProperties from "../components/UI/properties/DisplayProperties";
import Hero from "../components/UI/properties/Hero";
import Footer from "../components/layout/Footer";

const Properties = () => {
  const location = useLocation();
  const { id } = useParams();

  // Check if the current route matches the nested route
  const isChildRoute = location.pathname.includes("/properties/") && id;
  return (
    <>
      {!isChildRoute && (
        <>
          <Hero />
          <DisplayProperties />
          <Footer />
        </>
      )}
      <Outlet />
    </>
  );
};

export default Properties;
