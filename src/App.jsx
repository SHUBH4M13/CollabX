// App.jsx
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import HeroSection from "./Components/HeroSection";
import LoginPage from "./Components/LoginPage";
import SignupLayout from "./Components/SignupComponents/SignupLayout";
import SignupPage from "./Components/SignupComponents/SignupPage"
import OTPAuthPage from "./Components/SignupComponents/OTPAuthPage";
import VerificationSuccess from "./Components/SignupComponents/VerificationSuccess";
import DashboardLayout from "./Components/Dashboard/DashboardLayout";
import GetEmployees from "./Components/Dashboard/GetInfo/GetEmployees";
import AddEmployeeForm from "./Components/Dashboard/GetInfo/AddEmployeeForm"
import EditProfilePage from "./Components/EditProfilePage";
import UserProfileView from "./Components/UserProfileView";
import EmployeeLayout from "./Components/Dashboard/GetInfo/EmployeeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroSection />,
  },
  {
    path: "/signup",
    element: <SignupLayout />,
    children: [
      {
        path: "",
        element: <SignupPage/>,
      },
      {
        path: "otp", 
        element: <OTPAuthPage />,
      },
      {
        path: "success",
        element: <VerificationSuccess />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/user/:user_id",
    element: <UserProfileView />,
  },
  {
    path: "/edit/:user_id",
    element: <EditProfilePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "employees",
        element: <EmployeeLayout />,
        children: [
          {
            path: "",
            element: <GetEmployees/>
          },
          {
            path: "add",
            element: <AddEmployeeForm/>
          }
        ]
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
