import useUserAuthStore from "../../contexts/useUserAuthContext";
import PropertyDetailsLandlord from "./PropertyDetailsLandlord";
import PropertyDetailsTenant from "./PropertyDetailsTenant";

const PropertyDetails = () => {
  const { user } = useUserAuthStore();

  return (
    <>
      {user?.role === "landlord" ? (
        <PropertyDetailsLandlord />
      ) : (
        <PropertyDetailsTenant />
      )}
    </>
  );
};

export default PropertyDetails;
