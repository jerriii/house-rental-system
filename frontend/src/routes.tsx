import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/common/Loader";
import useUserAuthStore from "./contexts/useUserAuthContext";
const ShowBooking = lazy(() => import("./pages/ShowBooking.tsx"));
const PreferencesForm = lazy(() => import("./pages/PreferencesForm.tsx"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome.tsx"));
const AdminProperties = lazy(() => import("./pages/admin/AdminProperties.tsx"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers.tsx"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings.tsx"));

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Explore = lazy(() => import("./pages/Explore"));
const LandlordPayments = lazy(
  () => import("./pages/landlord/LandlordPayments")
);
const LandlordProperty = lazy(
  () => import("./pages/landlord/LandlordProperty")
);
const Profile = lazy(() => import("./pages/Profile"));
const AddProperties = lazy(() => import("./pages/AddProperties.tsx"));
const PropertyDetails = lazy(
  () => import("./pages/properties/PropertyDetails")
);
const UpdateProperties = lazy(() => import("./pages/UpdateProperties"));

const AppRoutes = () => {
  const { user, isAuthenticated } = useUserAuthStore();
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/explore" element={<Explore />} />
        {user && (
          <>
            <Route path="profile" element={<Profile />} />
            <Route path="/bookings" element={<ShowBooking />} />
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Route path="admin" element={<AdminHome />} />
            <Route path="/admin-properties" element={<AdminProperties />} />
            <Route path="/admin-users" element={<AdminUsers />} />
            <Route path="/admin-bookings" element={<AdminBookings />} />
          </>
        )}
        {user?.role === "tenant" && (
          <Route path="/preferences" element={<PreferencesForm />} />
        )}

        {user?.role === "landlord" && (
          <>
            <Route path="payments" element={<LandlordPayments />} />
            <Route path="properties" element={<LandlordProperty />} />
            <Route
              path="/properties/edit/:id"
              element={<UpdateProperties />}
            />
            <Route path="add-property" element={<AddProperties />} />
          </>
        )}

        <Route path="/properties/:id" element={<PropertyDetails />} />

        {user === null && !isAuthenticated && (
          <Route path="/login" element={<Login />} />
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
