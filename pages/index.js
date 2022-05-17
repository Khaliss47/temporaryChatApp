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
        border="2px"
        borderColor="whiteAlpha.100"
        rounded='md'
        background="white"
        bgGradient='linear(to-r, #02AAB0, #00CDAC)'

      >

        <Image src='/h1.png' width='320px' height='150px' alt='logo' pointerEvents= 'none' />
        <Text fontFamily='poppins' padding='25px' fontWeight={500} pointerEvents='none'>─────────• To Continue •─────────</Text>
        <Button
        _focus={{outline: 0}}
          mt={5}
          boxShadow="xl"
          width="100%"
          onClick={() => {
            signInWithRedirect(auth, new GoogleAuthProvider());
          }}
          leftIcon={<FcGoogle />}
          size="lg"
          colorScheme="gray"
          _hover={{ transform: "scale(1.04)" }}
          transition="0.5s"
        >

        </Button>
        <Button
          _focus={{ outline: 0 }}
          _hover={{ transform: "scale(1.04)"}}
          width="100%"
          leftIcon={<FaTwitter />}
          size="lg"
          boxShadow="xl"
          transition="0.5s"
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