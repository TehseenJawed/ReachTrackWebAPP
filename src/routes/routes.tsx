import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "pages/Dashboard/Dashboard";
import Layout from "utils/Layout";
import LoginScreen from "pages/Login/Login";
import Vehicles from "pages/Vehicles/Vehicles";
// import Trips from "@pages/Trips/Trips.tsx";
import Trips from "pages/Trips/Trips";
import Observations from "pages/Observations/Observations";
import Settings from "pages/Settings/Settings";
import Playback from "pages/Playback/Playback";
import Drivers from "pages/Drivers/Drivers";
import MapLayout from "utils/MapLayout";
import Maintenance from "pages/Maintenance/Maintenance";
import FuelGroup from "pages/FuelGroup/FuelGroup";
import GeofenceArea from "pages/GeofenceArea/GeofenceArea";
import GeofenceRoute from "pages/GeofenceRoute/GeofenceRoute";
import Reports from "pages/Reports/Reports";
import AuthLayout from "utils/AuthLayout";
import GroupScreen from "pages/Groups/Groups";
import Users from "pages/Users/Users";
import Account from "pages/Account/Account";
import AcceptInvitation from "pages/AcceptInvitation/AcceptInvitation";
import Profile from "pages/Profile/Profile";
import Notifications from "pages/Notifications/Notifications";
import Redirect from "components/redirectComponent";
import GlobalSearch from "pages/GlobalSearch/GlobalSearch";

createBrowserRouter([
  {
    path: "/dashboard",
    element: <div>Hello world!</div>,
  },
]);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <AuthLayout>
          <Redirect />
        </AuthLayout>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Dashboard />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/global-search",
      element: (
        <AuthLayout>
          <Layout>
          <GlobalSearch />
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/users",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Users />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/profile",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Profile />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/accept-invitation",
      element: (
        <MapLayout>
          <AcceptInvitation />
        </MapLayout>
      ),
    },
    {
      path: "/account",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Account />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/search",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Dashboard />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "vehicles/",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Vehicles />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "vehicles/:id",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Vehicles />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "notification",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Notifications />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/history/trips",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Trips />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/history/observations",
      element: (
        <AuthLayout>
          <Layout>
            <Observations />
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/history/playback",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Playback />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/drivers",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Drivers />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/drivers/:id",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Drivers />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/maintenance",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Maintenance />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/maintenance/:vehicleId",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Maintenance />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/reports",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <Reports />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/setting",
      element: (
        <AuthLayout>
          <Layout>
            <Settings />
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/notifications",
      element: (
        <AuthLayout>
          <Layout>
            <Settings />
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/groups",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <GroupScreen />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/groups/:id",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <GroupScreen />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <LoginScreen />
      ),
    },
    {
      path: "/admin",
      element: (
        <AuthLayout>
          <Layout>
            <LoginScreen />
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/fuelgroup",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <FuelGroup />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/fuelgroup/:id",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <FuelGroup />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/geofence/area",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <GeofenceArea />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/geofence/area/:id",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <GeofenceArea />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/geofence/route",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <GeofenceRoute />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
    {
      path: "/geofence/route/:id",
      element: (
        <AuthLayout>
          <Layout>
            <MapLayout>
              <GeofenceRoute />
            </MapLayout>
          </Layout>
        </AuthLayout>
      ),
    },
  ]
);

export { router };
