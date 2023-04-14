import { loginUser } from "@/api/notes.api";
import Navbar from "@/components/Navbar";
import { Login } from "@/styles/Login.styles";
import { Box, Flex, FormControl, FormLabel, useToast, Heading, Input, Text, Button, Spinner, InputRightElement, InputGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  // Navigation Purpose
  const router = useRouter();

  //Custom Toast Hook
  const toast = useToast();

  // Response Handling
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // View Password Btn Function
  const handleClick = () => setShow(!show);
  
  //ChakraUI Toast
  const customToast = useCallback((title = "Hello World", status = "success", position = "bottom-left") => {
    toast({
      title,
      status,
      position,
      isClosable: true,
    });
  },[toast]);
  
  // Handle Response Conditions
  useEffect(() => {
    let id;
    if (res === "SUCCESS") {
      customToast("Login Success, Redirecting...");
      id = setTimeout(() => {
        router.push("/");
      }, 2000);
      setLoading(false);
    } else if (res === "ERROR") {
      customToast("Internal Server Error...", "error");
      setLoading(false);
    } else if (res === "WARNING") {
      customToast("Wrong Credentials...", "warning");
      setLoading(false);
    }

    // Cleanup
    return () => {
      clearTimeout(id);
    };
  }, [res,customToast,router]);

  // form Hook
  const { register, handleSubmit } = useForm();


  // form on Submit validation success => Data
  const submitData = async (data) => {
    setLoading(true);
    const myData = await loginUser(data);
    localStorage.setItem("token", myData.token);
    setRes(myData.flag);
  };

  // form on submit Validation failed
  const onError = (error) => {
    const { password, email } = error;
    if (email) {
      customToast(email.message, "info", "top");
    } else if (password) {
      customToast(password.message, "info", "top");
    }
  };

  return (
    <>
      <Navbar />
      <Flex {...Login.main}>
        <Heading {...Login.heading}>Log In</Heading>
        <Box {...Login.border}></Box>
        <form onSubmit={handleSubmit(submitData, onError)}>
          <FormControl {...Login.formCtrl} isRequired>
            <Flex {...Login.card}>
              <Flex {...Login.ipFlex}>
                <FormLabel fontSize={"sm"} color={"#ababab"}>
                  Enter Email address
                </FormLabel>
                <Input
                  {...Login.input}
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  placeholder="Email"
                />
                <Text {...Login.ipBottom}>We will never share your Email.</Text>
              </Flex>
              <Flex {...Login.ipFlex}>
                <FormLabel {...Login.label}>Enter Password</FormLabel>

                <InputGroup>
                  <Input
                    {...Login.ipPass}
                    type={show ? "text" : "password"}
                    {...register("password", { required: true, minLength: { value: 8, message: "Password is Short" } })}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button {...Login.miniBtn} onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text {...Login.ipBottom}>We will never share your Password.</Text>
              </Flex>
              <Button disabled={loading} {...Login.btn} type="submit">
                {loading ? <Spinner /> : "Submit"}
              </Button>
              <Text {...Login.goSignUp} onClick={() => router.push("/signup")}>
                New User ? Create Account.
              </Text>
            </Flex>
          </FormControl>
        </form>
        <Box {...Login.border}></Box>
      </Flex>
    </>
  );
};

export default LoginPage;
