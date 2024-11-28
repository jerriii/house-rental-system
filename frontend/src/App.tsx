import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useBoolean } from "@chakra-ui/react";
import { BiBuildingHouse, BiHomeAlt2 } from "react-icons/bi";
import { BsPersonGear } from "react-icons/bs";
// import { IoInformationCircleOutline } from "react-icons/io5";
// import { MdOutlineExplore } from "react-icons/md";
// import { BsPersonGear } from "react-icons/bs";
import { useUserRole } from "./hooks/useUserRole.tsx";
import Loader from "./components/common/Loader.tsx";
const Header = React.lazy(() => import("./components/layout/Header"));
const Main = React.lazy(() => import("./components/layout/Main"));
const Sidebar = React.lazy(() => import("./components/layout/Sidebar"));
const AppRoutes = React.lazy(() => import("./routes"));

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {MdOutlineExplore} from "react-icons/md";
import {IoInformationCircleOutline} from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
// import { FaHandHoldingDollar } from "react-icons/fa6";

const queryClient = new QueryClient();

const AppContent = () => {
  const commonNavlinks = [
    {
      id: 1,
      name: "Home",
      path: "/",
      logo: <BiHomeAlt2 style={{ height: "1.5rem", width: "1.5rem" }} />,
    },
  ];
  const normalNavlinks = [
    ...commonNavlinks,
    {
      id: 2,
      name: "Explore",
      path: "/explore",
      logo: <MdOutlineExplore style={{ height: "1.5rem", width: "1.5rem" }}/>,
    },
    {
      id: 3,
      name: "About us",
      path: "/about",
      logo: (
        <IoInformationCircleOutline
          style={{ height: "1.5rem", width: "1.5rem" }}
        />
      ),
    },
    // {
    //   id: 4,
    //   name: "Services",
    //   path: "/services",
    //   logo: <BsPersonGear style={{ height: "1.5rem", width: "1.5rem" }} />,
    // },
  ];
  const landlordNavlinks = [
    ...commonNavlinks,
    // {
    //   id: 2,
    //   name: "Explore",
    //   path: "/explore",
    //   logo: <MdOutlineExplore style={{ height: "1.5rem", width: "1.5rem" }}/>,
    // },
    {
      id: 3,
      name: "Properties",
      path: "/properties",
      logo: <BiBuildingHouse style={{ height: "1.5rem", width: "1.5rem" }} />,
    },
    {
      id: 4,
      name: "Bookings",
      path: "/bookings",
      logo: <FaRegCalendarAlt style={{ height: "1.5rem", width: "1.5rem" }} />,
    },
  ];

  const tenantNavlinks = [
    ...commonNavlinks,
    {
      id: 2,
      name: "Explore",
      path: "/explore",
      logo: <MdOutlineExplore style={{ height: "1.5rem", width: "1.5rem" }}/>,
    },
    {
      id: 3,
      name: "Bookings",
      path: "/bookings",
      logo: <FaRegCalendarAlt style={{ height: "1.5rem", width: "1.5rem" }} />,
    }
    // {
    //   id: 3,
    //   name: "Favorites",
    //   path: "/favorites",
    //   logo: (
    //     <IoInformationCircleOutline
    //       style={{ height: "1.5rem", width: "1.5rem" }}
    //     />
    //   ),
    // },
    // {
    //   id: 4,
    //   name: "Payments",
    //   path: "/payments",
    //   logo: <BsPersonGear style={{ height: "1.5rem", width: "1.5rem" }} />,
    // },
    // {
    //   id: 5,
    //   name: "Profile",
    //   path: "/profile",
    //   logo: <BsPersonGear style={{ height: "1.5rem", width: "1.5rem" }} />,
    // },
  ];

  const adminNavlinks = [
    {
      id: 1,
      name: "Home",
      path: "/admin",
      logo: <BiHomeAlt2 style={{ height: "1.5rem", width: "1.5rem" }} />,
    },
    {
      id: 2,
      name: "Properties",
      path: "/admin-properties",
      logo: <BiBuildingHouse style={{ height: "1.5rem", width: "1.5rem" }} />,
    },
    {
      id: 3,
      name: "Users",
      path: "/admin-users",
      logo: <BsPersonGear style={{ height: "1.5rem", width: "1.5rem" }} />,
    },
    {
      id: 4,
      name: "Bookings",
      path: "/admin-bookings",
      logo: <FaRegCalendarAlt style={{ height: "1.5rem", width: "1.5rem" }} />,
    }
  ];

  const userRole = useUserRole();
  const navlinks =
    userRole === "landlord"
      ? landlordNavlinks
      : userRole === "tenant"
        ? tenantNavlinks
        :userRole==="admin"?adminNavlinks: normalNavlinks;
  const [flag, { toggle }] = useBoolean();
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/preferences" && (
        <>
          <Header toggleSidebar={toggle} navlinks={navlinks} />
          <Sidebar
            showSidebar={flag}
            setShowSidebar={toggle}
            navlinks={navlinks}
          />
        </>
      )}
      <Main>
        <AppRoutes />
      </Main>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
        <React.Suspense fallback={<Loader />}>
          <AppContent />
        </React.Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
