import {
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

//TODO: redefine password length
const MTest9 = () => {
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
            <Heading>Thiis is a test page</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account ?</Text>
              <Button variant="link" colorScheme="orange">
                Martin test
              </Button>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default MTest9;
