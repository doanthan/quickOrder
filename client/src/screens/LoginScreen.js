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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as ReactLink, useLocation } from "react-router-dom";
import TextField from "../components/TextField";
import { login } from "../redux/actions/userActions";
import { useForm } from "react-hook-form";
import PasswordTextField from "../components/PasswordTextField";

//TODO: redefine password length
const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = "/products";
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    dispatch(login(values.email, values.password));
  };

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({
        description: "Login successful.",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, location.state, toast]);

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
            <Heading size={headingBR}>Log in to your account</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account ?</Text>
              <Button
                as={ReactLink}
                to="/registration"
                variant="link"
                colorScheme="orange"
              >
                Sign up
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
                <PasswordTextField
                  type="password"
                  name="password"
                  placeholder="your password"
                  label="Password"
                  register={register}
                  errors={errors}
                />
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

export default LoginScreen;
