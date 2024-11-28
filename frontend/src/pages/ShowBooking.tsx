import { Button, HStack } from "@chakra-ui/react";
import useUserAuthStore from "../contexts/useUserAuthContext";
import ShowBookingLandlord from "./landlord/ShowBookingLandlord";
import ShowBookingTenant from "./tenant/ShowBookingTenant";

const ShowBooking = () => {
    const {user} = useUserAuthStore();

    if (user?.role === "tenant") {
        return <ShowBookingTenant/>;
    }
    else if (user?.role === "landlord") {
        return <ShowBookingLandlord/>;
    }
    else {
        return <HStack justifyContent={"center"} alignItems={"center"}>You must login first <Button>Login</Button></HStack>;
    }
};

export default ShowBooking;
