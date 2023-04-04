import {
  Button,
  Container,
  Heading,
  VStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  PaymentRequestButtonElement,
  useStripe,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Demo total",
          amount: 1099,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);

  // Use a traditional checkout form.
  return (
    <Stack spacing="8">
      <Stack spacing="6">
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading>Thiis is a test page</Heading>
          {paymentRequest && (
            <PaymentRequestButtonElement options={{ paymentRequest }} />
          )}
          <VStack spacing="1" justify="center">
            <Button variant="outline" colorScheme="blue">
              Google Pay test
            </Button>
            <Button variant="outline" colorScheme="blue">
              Apple Pay test
            </Button>
          </VStack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CheckoutForm;
