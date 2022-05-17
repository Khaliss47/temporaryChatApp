import { useState } from "react";
import { Button, Center, VStack, Input } from "@chakra-ui/react";
import { useColorModeValue, useColorMode } from "@chakra-ui/react";

function testing() {
  const { colorMode, toggleColorMode } = useColorMode();
  const value = useColorModeValue('gray.100', 'gray.700')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`your email is ${email} and password : ${password}`)
    setEmail('');
  }
  return (
    <Center h='100vh'>
    <VStack as="form" background={value} p={6} rounded='4' onSubmit={handleSubmit}>
      <Input placeholder="enter your email" mb={3} onChange={(e) => setEmail(e.target.value)}/>
      <Input placeholder='enter your password' mb={3} onChange={(e) => setPassword(e.target.value)} />
      <Button colorScheme="teal" type='submit' mb={2}>Submit</Button>
      <Button colorScheme='gray' onClick={toggleColorMode}>Togggle Color Mode</Button>
    </VStack>
    </Center>
  );
}

export default testing;
