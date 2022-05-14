import { FcGoogle } from "react-icons/fc";
import { HStack, Center, Button } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase";

function login() {
  return (
    <Center height="100vh">
      <HStack p={4}>
        <Button
          onClick={() => {
            signInWithRedirect(auth, new GoogleAuthProvider())
          }}
          leftIcon={<FcGoogle />}
          size="lg"
          colorScheme="gray"
        >
          Google
        </Button>
      </HStack>
    </Center>
  );
}

export default login;
