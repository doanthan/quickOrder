import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/actions/cartActions";

const CartOrderSummary = ({ cart, subtotal, expressShipping }) => {
  const [buttonLoading, setButtonLoading] = useState();
  const standardShipping = Number(4.99).toFixed(2);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkoutHandler = async () => {
    setButtonLoading(true);
    const response = await axios.post("create-checkout-session", cart);
    console.log(response);
    if (response) {
      window.location.assign(response.data.url);
    }
    setButtonLoading(false);
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" w="full">
      <Heading size="md">Order Summary</Heading>
      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
            Subtotal
          </Text>
          <Text fontWeight="medium">${subtotal}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
            Shipping
          </Text>
          <Text fontWeight="medium">
            {subtotal <= 1000 ? (
              standardShipping
            ) : (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Free
              </Badge>
            )}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="xl" fontWeight="extrabold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            ${" "}
            {subtotal <= 1000
              ? Number(subtotal) + Number(standardShipping)
              : subtotal}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="orange"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}
      >
        Checkout
      </Button>
      <Button
        colorScheme="orange"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => dispatch(resetCart("the-apple-store"))}
      >
        Reset Cart
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
