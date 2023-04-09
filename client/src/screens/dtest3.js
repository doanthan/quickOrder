import {
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

//TODO: redefine password length
const DTest3 = () => {
  const sendMessage = () => {
    //socket.emit();
  };
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
            <Heading>Message</Heading>
            <HStack spacing="1" justify="center">
              <input></input>
              <Button variant="link" colorScheme="orange" onClick={sendMessage}>
                Send Message
              </Button>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default DTest3;
