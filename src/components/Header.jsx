import {
  Navbar,
  Button,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Dropdown,
  Avatar,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { toggleTheme, selectCurrentTheme } from "../features/theme/themeSlice";
import { signOutAsync } from "../features/auth/authSlice";
import UserSignInModal from "./auth/UserSignInModal";
import GuestSignInModal from "./auth/GuestSignInModal";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const theme = useSelector(selectCurrentTheme);
  const { pathname } = useLocation();
  const [showUserSignIn, setShowUserSignIn] = useState(false);
  const [showGuestSignIn, setShowGuestSignIn] = useState(false);

  const handleSignout = async () => {
    try {
      const result = await dispatch(signOutAsync()).unwrap();
      console.log("result: ", result);
      if (result?.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log("User sign-out failed:", error.message);
    }
  };

  return (
    <div className="mb-16 sm:mb-20">
      <Navbar className=" fixed top-0 left-0 w-full z-50 lg:backdrop-blur-sm border-b-2 py-4 m-auto">
        {/* Logo */}
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white"
        >
          <Button
            pill
            outline
            gradientDuoTone="pinkToOrange"
            className="uppercase font-bold"
          >
            {" "}
            Astrology
          </Button>
        </Link>

        {/* Actions */}
        <div className="flex gap-2 md:order-2">
          {/* toggle theme */}
          <Button
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </Button>

          {loggedInUser?.length !== 0 ? (
            // Content for logged-in users
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User"
                    img={loggedInUser?.profilePicture}
                    rounded
                  />
                }
              >
                <DropdownHeader>
                  <span className="block text-sm">
                    @{loggedInUser?.username}
                  </span>
                  <span className="block text-sm font-medium truncate">
                    {loggedInUser?.email}
                  </span>
                </DropdownHeader>
                {loggedInUser?.isAdmin ? (
                  <>
                    <Link to={"/dashboard"}>
                      <DropdownItem>Dashboard</DropdownItem>
                    </Link>
                    <DropdownDivider />
                  </>
                ) : null}
                <Link to={"/dashboard?tab=profile"}>
                  <DropdownItem>Profile</DropdownItem>
                </Link>
                <DropdownDivider />
                <div onClick={handleSignout}>
                  <DropdownItem>Sign Out</DropdownItem>
                </div>
              </Dropdown>
            </>
          ) : (
            <>
              <Link>
                <Button outline onClick={() => setShowGuestSignIn(true)}>
                  Guest
                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Button onClick={() => setShowUserSignIn(true)}>
                Sign In
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          )}
          <NavbarToggle />
        </div>

        {/* Navigation Links */}
        <NavbarCollapse>
          <NavbarLink active={pathname === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </NavbarLink>
          <NavbarLink active={pathname === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </NavbarLink>
          <NavbarLink active={pathname === "/projects"} as={"div"}>
            <Link to="/chat-with-astro">Chat With Astro</Link>
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

      <UserSignInModal
        show={showUserSignIn}
        onClose={() => setShowUserSignIn(false)}
      />
      <GuestSignInModal
        show={showGuestSignIn}
        onClose={() => setShowGuestSignIn(false)}
      />
    </div>
  );
}

export default Header;
