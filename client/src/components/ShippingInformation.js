import {
  Box,
  Heading,
  VStack,
  FormErrorMessage,
  Stack,
  Text,
  Radio,
  RadioGroup,
  Tooltip,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";

import TextField from "./TextField";
import { useDispatch } from "react-redux";
import { setExpress } from "../redux/actions/cartActions";
import { useState } from "react";
import {
  setShippingAddress,
  setShippingAddressError,
} from "../redux/actions/orderActions";
import { useForm } from "react-hook-form";

const ShippingInformation = () => {
  const dispatch = useDispatch();
  const [formStateChanged, setFormStateChanged] = useState(false);

  const {
    register,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const setErrorState = (input, data) => {
    if (!input) {
      dispatch(setShippingAddress(data));
    }
    if ((!formStateChanged && !input) || (formStateChanged && input)) {
      return;
    } else {
      setFormStateChanged(input);
      dispatch(setShippingAddressError(input));
    }
  };

  return (
    <VStack as="form">
      <Box w="100%" h="180px" pr="8">
        <RadioGroup defaultValue="false">
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
          >
            <Stack pr="10" spacing={{ base: "8", md: "10" }} flex="1.5">
              <Box>
                <Radio value="true">
                  <Text fontWeight="bold">Pickup</Text>
                  <Text>Dispatched in 24 hours.</Text>
                </Radio>
              </Box>
              <Stack spacing="6">Express</Stack>
            </Stack>
            <Radio value="false">
              <Tooltip label="Free shipping for orders of $1000 or more!">
                <Box>
                  <Text fontWeight="bold">Standard $4.99</Text>
                  <Text>Dispatched in 2 - 3 days</Text>
                </Box>
              </Tooltip>
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <Heading fontSize="2xl" fontWeight="extrabold" mb="10" pb="5">
        Delivery Address
      </Heading>
      <FormControl
        onChange={() =>
          isValid && isDirty
            ? setErrorState(false, getValues())
            : setErrorState(true)
        }
      >
        <FormControl isInvalid={errors.address} mb="6">
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            id="address"
            placeholder="Street Address"
            {...register("address", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.address && errors.address.message}
          </FormErrorMessage>
        </FormControl>
        <Flex>
          <Box flex="1" mr="10">
            <FormControl isInvalid={errors.postalCode} mb="6">
              <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
              <Input
                id="postalCode"
                placeholder="Post Code"
                type="number"
                {...register("postalCode", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.postalCode && errors.postalCode.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box flex="2">
            <FormControl isInvalid={errors.city}>
              <FormLabel htmlFor="city">City</FormLabel>
              <Input
                id="city"
                placeholder="City"
                {...register("city", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.city && errors.city.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
        </Flex>
        <FormControl isInvalid={errors.country} mb="4">
          <FormLabel htmlFor="country">Country</FormLabel>
          <Input
            id="country"
            placeholder="Country"
            {...register("country", {
              required: "This is required",
              minLength: {
                value: 4,
                message: "Minimum length should be 4",
              },
            })}
          />
          <FormErrorMessage>
            {errors.country && errors.country.message}
          </FormErrorMessage>
        </FormControl>
      </FormControl>
    </VStack>
  );
};

export default ShippingInformation;
