import { Center, Tooltip, Heading, useBoolean } from "@chakra-ui/react";
import Chat from "../components/Chat";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalBody,
  Text,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";

function index() {
  const [generatedKey, setGeneratedKey] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure(true);
  const { hasCopied, onCopy } = useClipboard(generatedKey);
  const toast = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const generateKey = () => {
    setGeneratedKey(makeid(7));
  };
  const handleClose = () => {
    if (generatedKey.length == 7) {
      onClose();
      toast({
        title: 'Key Generated successFully',
        description: "You can easily now chat with your friend.",
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Key Generated Failed',
        description: "Please Generate or enter a real key.",
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    }
  };
  useEffect(() => {
    onOpen();
  },[])
  return (
    <>
      <Chat generatedKey={generatedKey} />
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bgGradient='linear(to-r, #02AAB0, #00CDAC)'>
          <ModalHeader fontFamily='Poppins' color='#fff' fontWeight={700}>Dialog Generator</ModalHeader>
          <ModalBody>
            <Text mb={6} fontFamily='Poppins' fontWeight={400} color='#fff'>Please Generate or Use a key to join a chat room</Text>
            <VStack as="form" onSubmit={handleSubmit}>
              <InputGroup>
                <Input
                  onChange={(e) => setGeneratedKey(e.target.value)}
                  placeHolder="Enter Or Genrate a key"
                  variant='flushed'
                  _focus={0}
                  _placeholder={{ color: 'inherit' }}
                  value={generatedKey}
                  fontFamily='Poppins'
                  fontWeight={600}
                  opacity={0.9}
                  color="#fff"
                />
                <InputRightElement width="4.5rem">
                  <Button onClick={onCopy} size="sm" fontFamily='poppins' fontWeight={700} _focus={{ outline: 0 }} bg="transparent" _hover={{opacity: 0.5}} color='#fff'>
                    {hasCopied ? "Copied" : "Copy"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={generateKey} bg="#fff" fontFamily='Poppins' _focus={{ outline: 0 }} bg="transparent" color='#fff' _hover={{ border: '1px solid #fff'}}>
              Generate Key
            </Button>
            <Button onClick={handleClose} _focus={{ outline: 0 }} fontFamily='Poppins' color='#fff' bg="transparent" _hover={{ border: '1px solid #fff' }}>
              Join Room
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default index;