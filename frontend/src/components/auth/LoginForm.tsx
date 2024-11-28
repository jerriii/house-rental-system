import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { LoginSignupProps } from "../../types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const LoginForm: React.FC<LoginSignupProps> = ({
  register,
  formSubmit,
  errors = {},
  loading,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    // login form
    <form onSubmit={formSubmit} className="flex-1 content-center">
      <VStack>
        {/* form control for email  */}
        <FormControl isInvalid={!!errors?.email && !!errors?.email?.message}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "This is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            autoComplete="email"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        {/* form control for password */}
        <FormControl
          isInvalid={!!errors?.password && !!errors?.password?.message}
        >
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              id={"password"}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "This is required",
                minLength: { value: 8, message: "Minimum length should be 8" },
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                variant="link"
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors?.password && errors?.password?.message}
          </FormErrorMessage>
        </FormControl>
        {/* submit */}
        <Button mt={4} type="submit" isLoading={loading}>
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
