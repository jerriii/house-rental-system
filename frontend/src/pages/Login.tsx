import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FieldError, Inputs } from "../types";
import useCustomColor from "../hooks/useCustomColor";
import React from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import { useNavigate } from "react-router-dom";
import {useLoginMutation, useRegisterMutation} from "../hooks/react-query/Users.tsx";


const Login = () => {
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = React.useState<string | null>(null);
  


  const { handleSubmit, register, formState, reset, watch, setValue, trigger } =
    useForm<Inputs>();
  const [loginSignup, setLoginSignup] = React.useState<"login" | "signup">(
    "login"
  );

  const register_mutation = useRegisterMutation();

  const login_mutation = useLoginMutation();

  const loading = login_mutation.isPending;

  const { errors } = formState as {
    errors: FieldError;
  };
  const { header_background, primaryAccentColor, hover_color } =
    useCustomColor();

  const handleSignupSubmit = (data: Inputs) => {
    const userData = { ...data, role: data.role }; // Prepare user data with role

    register_mutation.mutate(userData, {
      onSuccess: () => {
        setLoginSignup("login"); // Switch to login mode
        reset(); // Clear the form
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.error("Signup failed:", error.message); // Log error message
        } else {
          console.error("Unexpected error during signup:", error); // Handle unexpected errors
        }
      },
    });
  };

  const handleLoginSubmit = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      const loginResponse = await login_mutation.mutateAsync(data);
       // Check for redirection based on user preferences
       if (loginResponse.redirectTo) {
        navigate(loginResponse.redirectTo);
      } else {
        // If no specific redirect, navigate to homepage
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      w={"100%"}
      h={"100%"}
      position={"relative"}
      display={"grid"}
      placeItems={"center"}
    >
      <VStack
        as={"section"}
        border={"1px solid"}
        p={4}
        w={"fit-content"}
        minH={"460px"}
        background={header_background}
        borderRadius={"lg"}
      >
        <Flex position={"relative"}>
          <Text
            px={4}
            py={2}
            borderRadius={"full"}
            bgColor={loginSignup === "login" ? primaryAccentColor : "inherit"}
            color={loginSignup === "login" ? hover_color : "inherit"}
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              setLoginSignup("login");
              reset();
              setSignUpError(null);
            }}
          >
            Login
          </Text>
          <Text
            px={4}
            py={2}
            borderRadius={"full"}
            bgColor={loginSignup === "signup" ? primaryAccentColor : "inherit"}
            color={loginSignup === "signup" ? hover_color : "inherit"}
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              setLoginSignup("signup");
              reset();
              setSignUpError(null);
            }}
          >
            Sign Up
          </Text>
        </Flex>

        {signUpError && (
          <Text color="red.500" fontSize="sm" textAlign="center">
            {signUpError}
          </Text>
        )}

        {loginSignup === "login" ? (
          <LoginForm
            formSubmit={handleSubmit(handleLoginSubmit)}
            errors={errors}
            register={register}
            loading={loading}
          />
        ) : (
          <SignupForm
            formSubmit={handleSubmit(handleSignupSubmit)}
            errors={errors}
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
          />
        )}
      </VStack>
    </Box>
  );
};

export default Login;
