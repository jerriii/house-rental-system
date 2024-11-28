// import Hero from "../components/UI/home/Hero";
// import Footer from "../components/layout/Footer";
import useUserAuthStore from "../contexts/useUserAuthContext";
import LandlordHome from "./landlord/LandlordHome";
import TenantHome from "./tenant/TenantHome";
import Footer from "../components/layout/Footer.tsx";
import Hero from "../components/UI/home/Hero.tsx";
import ProductsListing from "../components/UI/home/ProductsListing.tsx";
import { useFetchProperties } from "../hooks/react-query/Property.tsx";
import { Text } from "@chakra-ui/react";
import Loader from "../components/common/Loader.tsx";
const Home = () => {
  enum UserRole {
    tenant = "tenant",
    landlord = "landlord",
  }

  const { data, isLoading, isError } = useFetchProperties();
  const { user, isAuthenticated } = useUserAuthStore();

  if (isLoading) return <Loader />;
  if (isError) return <Text>Error fetching properties. Please try again later.</Text>;

  return isAuthenticated && user?.role?.includes(UserRole.landlord) ? (
    <LandlordHome />
  ) : isAuthenticated && user?.role?.includes(UserRole.tenant) ? (
    <TenantHome />
  ) : (
    <>
      {/*<Explore/>*/}
      <Hero />
      <ProductsListing
        loading={isLoading}
        navigation="/explore"
        title="Featured Properties"
        data={data.limited_properties}
      />
      {isError && (
        <Text>Error fetching properties. Please try again later.</Text>
      )}
      <Footer />
    </>
  );
};

export default Home;
