import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Nav } from "@/styles/Navbar.styles";

const Navbar = () => {
  // store token
  const [token, setToken] = useState("");

  // Navigation
  const router = useRouter();

  // catch token on mount
  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  // handle on login/logout click
  const handleAuth = () => {
    if (token) {
      localStorage.removeItem("token");
      router.push("/login");
    } else {
      router.push("/login");
    }
  };

  return (
    <Flex {...Nav.main}>
      <Button {...Nav.btn} onClick={() => router.push("/")}>
        Home
      </Button>
      <Button {...Nav.btn} onClick={() => router.push("/about")}>
        About
      </Button>
      <Button {...Nav.btn} onClick={() => router.push("/signup")}>
        Sign Up
      </Button>
      <Button {...Nav.btn} onClick={() => handleAuth()}>
        {token ? "Logout" : "Login"}
      </Button>
    </Flex>
  );
};

export default Navbar;
