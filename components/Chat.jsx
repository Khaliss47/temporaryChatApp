import {
  Flex,
  HStack,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Box,
  Text,
  IconButton,
  Icon,
  shouldForwardProp,
  InputGroup,
  InputLeftElement,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineSearch } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const messages = [];

function Chat() {
  const { user } = useAuth();
  console.log(user);

  const [chatWithUsername, setChatWithUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [msgArray, setMsgArray] = useState(messages);
  const messageRef = useRef(null);

  const chatWithUsernameGen = () => {
    let randomValue = Math.floor(Math.random() * 10000);
    setChatWithUsername("username-" + randomValue);
  };

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    const d = new Date().toLocaleTimeString();
    if (msg) {
      let tempMsgArray = [
        ...msgArray,
        { message: msg, from: "me", dateSent: d },
      ];
      setMsgArray(tempMsgArray);
      setMsg("");
    } else {
      setMsg("");
    }
  };

  useEffect(() => {
    chatWithUsernameGen();
  }, []);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("hello wolrd");
  }, [msgArray]);

  return (
    <Flex w="full" flexDirection="column" h="100vh">
      <HStack p={4} borderBottomColor="gray.100">
        <VStack>
        <Avatar name={user.displayName} src={user.photoURL} />
        </VStack>
        
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdOutlineSearch size={22} color="gray.300" />}
          />
          <Input variant="filled" rounded="full" placeholder="Search friends" />
        </InputGroup>

        <Button
          onClick={() => {
            signOut(auth);
          }}
          colorScheme="teal"
          rightIcon={<HiOutlineLogout />}
        >
          Log Out
        </Button>
      </HStack>
      <Flex px={6} overflowY="auto" flexDirection="column" flex={1}>
        <Stat mt={6}>
          <StatLabel color="gray.500">Chatting with</StatLabel>
          <StatNumber>{chatWithUsername}</StatNumber>
        </Stat>
        {msgArray.map((data, index) => {
          return <ChatBubble key={index} {...data} />;
        })}
        <div ref={messageRef} />
      </Flex>
      <Flex
        as="form"
        pl={4}
        pr={2}
        py={2}
        borderTopColor="gray.100"
        borderTopWidth={1}
        onSubmit={handleMsgSubmit}
      >
        <Input
          variant="unstyled"
          placeholder="Typer your message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <IconButton
          colorScheme="blue"
          variant="ghost"
          icon={<IoMdSend />}
          type="submit"
        />
      </Flex>
    </Flex>
  );
}

function ChatBubble({ message, from, dateSent }) {
  const isMe = from === "me";
  const alignment = isMe ? "flex-end" : "flex-start";
  const bottomRightRadius = isMe ? 0 : 32;
  const bottomLeftRadius = isMe ? 32 : 0;
  const color = isMe ? "blue.50" : "gray.100";
  return (
    <VStack mt={6} alignItems={alignment} alignSelf={alignment}>
      <Box
        bg={color}
        px={6}
        py={4}
        maxW={80}
        borderTopLeftRadius={32}
        borderTopRightRadius={32}
        borderBottomLeftRadius={bottomLeftRadius}
        borderBottomRightRadius={bottomRightRadius}
      >
        {message}
      </Box>
      <Text color="gray" fontSize="xs">
        {dateSent}
      </Text>
    </VStack>
  );
}

export default Chat;
