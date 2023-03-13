import {
  Box,
  Heading,
  VStack,
  Flex,
  Stack,
  Text,
  Radio,
  RadioGroup,
  Tooltip,
  FormControl,
  Button,
} from "@chakra-ui/react";

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
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
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
    <form>
      <VStack as="form">
        <FormControl
          isInvalid={errors.name}
          onChange={
            isDirty || isValid
              ? setErrorState(false, "test")
              : setErrorState(true)
          }
        >
          <TextField
            name="address"
            placeholder="Street Address"
            label="Street Address"
            register={register}
            errors={errors}
            rules={{
              required: "This is required",
              minLength: { value: 2, message: "Minimum length should be 4" },
            }}
          />
          {errors && JSON.stringify(errors)}
          <Button onClick={() => alert(JSON.stringify(errors))}>TEST</Button>
          <Flex>
            <Box flex="1" mr="10">
              <TextField
                name="postalCode"
                placeholder="Postal Code"
                label="Postal Code"
                type="number"
                register={register}
                errors={errors}
                rules={{
                  required: "This is required",
                }}
              />
            </Box>
            <Box flex="2">
              <TextField
                name="city"
                placeholder="City"
                label="City"
                register={register}
                errors={errors}
                rules={{
                  required: "This is required",
                  minLength: {
                    value: 2,
                    message: "Minimum length should be 2",
                  },
                }}
              />
            </Box>
          </Flex>
          <TextField
            name="country"
            placeholder="Country"
            label="Country"
            register={register}
            errors={errors}
            rules={{
              required: "This is required",
              minLength: { value: 2, message: "Minimum length should be 2" },
            }}
          />
          <Box w="100%" h="180px" pr="5">
            <Heading fontSize="2xl" fontWeight="extrabold" mb="10">
              Shipping Method
            </Heading>
            <RadioGroup
              defaultValue="false"
              onChange={(e) => {
                dispatch(setExpress(e));
              }}
            >
              <Stack
                direction={{ base: "column", lg: "row" }}
                align={{ lg: "flex-start" }}
              >
                <Stack pr="10" spacing={{ base: "8", md: "10" }} flex="1.5">
                  <Box>
                    <Radio value="true">
                      <Text fontWeight="bold">Express 14.99</Text>
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
        </FormControl>
      </VStack>
    </form>
  );
};

export default ShippingInformation;
