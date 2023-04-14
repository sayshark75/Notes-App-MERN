import { Box, Flex, FormControl, FormLabel, useToast, Heading, Input, Text, Button, Spinner, InputRightElement, InputGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { SignUp } from "@/styles/Signup.styles";
import { signUpUser } from "@/api/notes.api";
import { useCallback } from "react";

const SignUpPage = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const toast = useToast();
  
  // Custom ChakraUI Toast
  const customToast = useCallback((title = "Hello World", status = "success", position = "bottom-left") => {
    toast({
      title,
      status,
      position,
      isClosable: true,
    });
  }, [toast]);
  
  //Sign up Response.
  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);

  // Toggle Pass and CPass input View button
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  // Handle response Conditions
  useEffect(() => {
    let id;
    if (res === "SUCCESS") {
      customToast("Account Created, Redirecting...");
      id = setTimeout(() => {
        router.push("/login");
      }, 2000);
      setLoading(false);
    } else if (res === "REGISTERED") {
      customToast("Account Already Exists...", "warning");
      setLoading(false);
    } else if (res === "ERROR") {
      customToast("Internal Server Error...", "error");
      setLoading(false);
    }

    // Cleanup
    return () => {
      clearTimeout(id);
    };
  }, [res, customToast, router]);

  // view Password Functions
  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);


  // Validation Success and Submitted
  const submitData = async (data) => {
    if (data.cpassword === data.password) {
      setLoading(true);
      const myData = await signUpUser(data);
      setRes(myData.flag);
    } else {
      customToast("Invalid Confirm Password...", "error");
    }
  };

  //Validation Error Handling
  const onError = (error) => {
    const { password, email, cpassword } = error;
    if (email) {
      customToast(email.message, "info", "top");
    } else if (password) {
      customToast(password.message, "info", "top");
    } else if (cpassword) {
      customToast(cpassword.message, "info", "top");
    }
  };

  return (
    <>
      <Navbar />
      <Flex {...SignUp.main}>
        <Heading {...SignUp.heading}>Sign Up</Heading>
        <Box {...SignUp.border}></Box>
        <form onSubmit={handleSubmit(submitData, onError)}>
          <FormControl {...SignUp.formCtrl} isRequired>
            <Flex {...SignUp.card}>
              <Flex {...SignUp.ipFlex}>
                <FormLabel {...SignUp.label}>Enter Username</FormLabel>
                <Input {...SignUp.input} {...register("name", { required: true, minLength: 4 })} placeholder="Username" />
              </Flex>
              <Flex {...SignUp.ipFlex}>
                <FormLabel {...SignUp.label}>Enter Email address</FormLabel>
                <Input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  {...SignUp.input}
                  placeholder="Email"
                />
                <Text {...SignUp.textBottom}>We will never share your Email.</Text>
              </Flex>
              <Flex {...SignUp.ipFlex}>
                <FormLabel {...SignUp.label}>Enter Password</FormLabel>
                <InputGroup>
                  <Input
                    {...SignUp.passIp}
                    type={show1 ? "text" : "password"}
                    {...register("password", { required: true, minLength: { value: 8, message: "Password is Short" } })}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button {...SignUp.miniBtn} onClick={handleClick1}>
                      {show1 ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text {...SignUp.textBottom}>We will never share your Password.</Text>
              </Flex>
              <Flex {...SignUp.ipFlex}>
                <FormLabel {...SignUp.label}>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    {...SignUp.passIp}
                    type={show2 ? "text" : "password"}
                    {...register("cpassword", { required: true, minLength: { value: 8, message: "Confirm Password is Short" } })}
                    placeholder="Confirm Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button {...SignUp.miniBtn} onClick={handleClick2}>
                      {show2 ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
              <Button isDisabled={loading} {...SignUp.submit}>
                {loading ? <Spinner /> : "Submit"}
              </Button>
              <Text {...SignUp.goLogin} onClick={() => router.push("/login")}>
                Already Have an Account? Login.
              </Text>
            </Flex>
          </FormControl>
        </form>
        <Box {...SignUp.border}></Box>
      </Flex>
    </>
  );
};

export default SignUpPage;
