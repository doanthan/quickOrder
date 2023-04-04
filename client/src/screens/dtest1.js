import { Container } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/StripePayment/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MomXcJ9N4IYCbeUEPu3gCSJStkRHDROrd5dcU5wNRadRJI0CrzOkZZZpSOtnC7qHMISiiF31uhr53HuGVtEnyTB00Cr8tG2KK"
);
//TODO: redefine password length
const DTest1 = () => {
  return (
    <Elements stripe={stripePromise}>
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", md: "8" }}
        minH="4xl"
      >
        <CheckoutForm />
      </Container>
    </Elements>
  );
};

export default DTest1;
