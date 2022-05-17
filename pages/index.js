import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { VStack, Center, Button, Text, Heading } from "@chakra-ui/react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase";
import Image from "next/image";

function login() {
  return (
    <Center height="100vh" background="#333">
      <VStack
        p="50px"
        border="1px"
        borderColor="gray.200"
        rounded='md'
        background="white"
        bgGradient='linear(to-r, #4CA1AF, #C4E0E5)'
        
      >
        <Image src='/h1.png' width='320px' height='150px' alt='logo' />
        <Text fontFamily='poppins' >To Continue</Text>
        <Button
        _focus={{outline: 0}}
          mt={5}
          width="100%"
          onClick={() => {
            signInWithRedirect(auth, new GoogleAuthProvider());
          }}
          leftIcon={<FcGoogle />}
          size="lg"
          colorScheme="gray"
        >
         
        </Button>
        <Button
          _focus={{ outline: 0 }}

          width="100%"
          leftIcon={<FaTwitter />}
          size="lg"
          colorScheme="twitter"
          onClick={() => {
            signInWithRedirect(auth, new FacebookAuthProvider());
          }}
        >
          
        </Button>
      </VStack>
    </Center>
  );
}

export default login;

