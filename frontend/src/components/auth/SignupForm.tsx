import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import { LoginSignupProps, UserRole } from "../../types";
import { IoChevronDown } from "react-icons/io5";
import React from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignupForm = ({
  register,
  formSubmit,
  errors,
  setValue,
  trigger,
  watch,
}: LoginSignupProps) => {
  // setting role from menu item. eg: Landlord, tenant
  const handleMenuItemClick = (role: UserRole) => {
    if (setValue && trigger) {
      setValue("role", role); // Update the value in the form
      trigger("role"); // Trigger validation for the role field
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  // selected role
  const selectedRole = watch ? watch("role") : "";
  return (
    // signup form
    <form onSubmit={formSubmit}>
      <VStack>
        {/* form control for name */}
        <FormControl
          isInvalid={!!errors?.name && !!errors?.name.message}
          isRequired
        >
          {/* label  */}
          <FormLabel htmlFor="name">Name</FormLabel>

          {/* input  */}
          <Input
            id="name"
            placeholder="Name"
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
            autoComplete="name"
            textTransform="capitalize"
          />

          {/* error message  */}
          <FormErrorMessage>
            {errors?.name && errors?.name.message}
          </FormErrorMessage>
        </FormControl>

        {/* form control for email  */}
        <FormControl
          isInvalid={!!errors?.email && !!errors?.email.message}
          isRequired
        >
          {/* label  */}
          <FormLabel htmlFor="email">Email</FormLabel>

          {/* input  */}
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

          {/* error message  */}
          <FormErrorMessage>
            {errors?.email && errors?.email.message}
          </FormErrorMessage>
        </FormControl>

        {/* form control for phone number */}
        <FormControl
          isInvalid={!!errors?.phone && !!errors?.phone.message}
          isRequired
        >
          {/* label  */}
          <FormLabel htmlFor="phone">Phone</FormLabel>

          {/* input  */}
          <Input
            id="phone"
            type="number"
            placeholder="Phone"
            {...register("phone", {
              minLength: { value: 10, message: "Minimum length should be 10" },
              required: "This is required",
            })}
          />

          {/* error message  */}
          <FormErrorMessage>
            {errors?.phone && errors?.phone.message}
          </FormErrorMessage>
        </FormControl>

        {/* form control for address */}
        <FormControl
          isInvalid={!!errors?.address && !!errors?.address.message}
          isRequired
        >
          {/* label  */}
          <FormLabel htmlFor="address">Address</FormLabel>

          {/* input  */}
          <Input
            id="address"
            placeholder="Address"
            {...register("address", {
              required: "This is required",
              pattern: {
                value: /^[A-Za-z].*$/, // Regular expression to ensure the first character is an alphabet
                message: "Address must start with an alphabet",
              },
            })}
            autoComplete="phone"
          />

          {/* error message  */}
          <FormErrorMessage>
            {errors?.address && errors?.address.message}
          </FormErrorMessage>
        </FormControl>
        {/* form control for password */}
        <FormControl
          isInvalid={!!errors?.password && !!errors?.password.message}
          isRequired
        >
          {/* label  */}
          <FormLabel htmlFor="password">Password</FormLabel>

          {/* input  */}
          <InputGroup>
            <Input
              id="password"
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

          {/* error message  */}
          <FormErrorMessage>
            {errors?.password && errors?.password.message}
          </FormErrorMessage>
        </FormControl>

        {/* form control for role */}
        <FormControl isRequired>
          {/* label  */}
          <FormLabel id="role-label" htmlFor="role-label">
            Role
          </FormLabel>

          {/* input  */}
          <Menu>
            {/* Display selected role or default text */}
            <MenuButton
              as={Button}
              variant="outline"
              rightIcon={<IoChevronDown />}
              aria-labelledby="role-label"
              id="role-label"
              width={"full"}
              textAlign={"left"}
              borderRadius={"lg"}
            >
              {selectedRole || "Select Role"}{" "}
            </MenuButton>

            {/* list of roles */}
            <MenuList overflow={"auto"} zIndex={10}>
              <MenuItem
                onClick={() => handleMenuItemClick("landlord" as UserRole)}
              >
                Landlord
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick("tenant" as UserRole)}
              >
                Tenant
              </MenuItem>
            </MenuList>
          </Menu>
        </FormControl>

        {/* submit */}
        <Button mt={4} type="submit">
          Register
        </Button>
      </VStack>
    </form>
  );
};

export default SignupForm;
