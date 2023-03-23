import {
  Box,
  Button,
  FormLabel,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import PasswordTextField from "../components/PasswordTextField";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { register as registerUser } from "../redux/actions/userActions";

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = "/products";
  const toast = useToast();
  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({
        description: "Account created. Welcome aboard.",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  const onSubmit = (values) => {
    dispatch(
      registerUser(values.name, values.email, values.password, values.storeName)
    );
  };

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", md: "8" }}
      minH="4xl"
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={headingBR}>Create an account.</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already a user ?</Text>
              <Button
                as={ReactLink}
                to="/registration"
                variant="link"
                colorScheme="orange"
              >
                Sign in
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", md: "8" }}
          px={{ base: "4", md: "10" }}
          bg={{ boxBR }}
          boxShadow={{ base: "none", md: "xl" }}
        >
          <Stack spacing="6" as="form" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <Alert
                status="error"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <AlertIcon />
                <AlertTitle>We are sorry!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Stack spacing="5">
              <FormControl>
                <FormControl isInvalid={errors.name} mb="6">
                  <FormLabel htmlFor="email">Name</FormLabel>
                  <Input
                    id="name"
                    placeholder="First and Last name"
                    {...register("name", {
                      required: "This is required",
                      minLength: {
                        value: 2,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email} mb="6">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    placeholder="you@email.com"
                    {...register("email", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.storeName} mb="6">
                  <FormLabel htmlFor="storeName">Store Name</FormLabel>
                  <Input
                    id="storeName"
                    placeholder="Store Name"
                    {...register("storeName", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.storeName && errors.storeName.message}
                  </FormErrorMessage>
                </FormControl>
                <PasswordTextField
                  type="password"
                  name="password"
                  placeholder="your password"
                  label="Password"
                  register={register}
                  errors={errors}
                />
                <FormControl isInvalid={errors.confirmPassword} mb="6">
                  <FormLabel noOfLines={1}>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "This is required",
                        minLength: {
                          value: 2,
                          message: "Minimum length should be 2",
                        },
                        validate: (value) =>
                          value === getValues("password") ||
                          "Please enter the same password",
                      })}
                    />
                    <InputRightElement h="full">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors?.confirmPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button
                colorScheme="orange"
                size="lg"
                fontSize="md"
                isLoading={loading}
                type="submit"
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegistrationScreen;
