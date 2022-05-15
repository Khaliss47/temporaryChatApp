import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { VStack, Center, Button, Text, Heading } from "@chakra-ui/react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase";

function login() {
  return (
    <Center height="100vh" background="#d6d6d6">
      <VStack
        p="50px"
        border="1px"
        borderColor="gray.200"
        rounded={6}
        background="white"
      >
        <Heading>Login With</Heading>
        <Text>Use your Google or Facebook Account</Text>
        <Button
          mt={5}
          width="100%"
          onClick={() => {
            signInWithRedirect(auth, new GoogleAuthProvider());
          }}
          leftIcon={<FcGoogle />}
          size="lg"
          colorScheme="gray"
        >
          Google
        </Button>
        <Heading fontSize="23px">Or</Heading>
        <Button
          width="100%"
          leftIcon={<FaFacebook />}
          size="lg"
          colorScheme="facebook"
          onClick={() => {
            signInWithRedirect(auth, new FacebookAuthProvider());
          }}
        >
          Facebook
        </Button>
      </VStack>
    </Center>
  );
}

export default login;
