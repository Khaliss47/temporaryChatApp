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
  InputGroup,
  InputLeftElement,
  Button,
  Avatar,
  Badge,
  Tooltip,
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
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import Image from "next/image";

function Chat({ generatedKey }) {
  const { user } = useAuth();

  // ---------getting data--------//

  const [messages, setMessages] = useState([]);

  // ------------getting data---------//
  const [chatWithUsername, setChatWithUsername] = useState("");
  const [msg, setMsg] = useState("");
  const lastMessageRef = useRef(null);

  // -------------handling the submit----------//
  const handleMsgSubmit = (e) => {
    e.preventDefault();
    const d = new Date().toLocaleTimeString();
    if (msg) {
      const colRef = collection(db, "messages");
      addDoc(colRef, {
        message: msg,
        uid: user.uid,
        createdAt: serverTimestamp(),
        keygen: generatedKey,
      });
      setMsg("");
    } else {
      setMsg("");
    }
  };
  // -------------------handling the submit---------//

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Flex w="full" flexDirection="column" h="100vh" bg="#232c38">
      <HStack p={4} borderBottomColor="gray.100">
        <Tooltip hasArrow bg="gray.400" color="black" label={user.displayName}>
          <Avatar
            name={user.displayName}
            src={user.photoURL}
            cursor="pointer"
          />
        </Tooltip>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdOutlineSearch size={22} color="gray.300" />}
          />
          <Input
            variant="filled"
            fontFamily="poppins"
            placeholder="Search friends . . ."
            borderRadius="20px"
            _focus={0}
            fontWeight={600}
            _placeholder={{ opacity: 0.5, fontWeight: 400 }}
          />
        </InputGroup>

        <Button
          onClick={() => {
            signOut(auth);
          }}
          _focus={0}
          borderRadius="20px"
          bg="#0084ff"
          color="#fff"
          _hover={{ bg: "#0077e6" }}
          rightIcon={<HiOutlineLogout size="23px" />}
        ></Button>
      </HStack>
      <Flex px={6} overflowY="auto" flexDirection="column" flex={1}>
        <Stat mt={6}>
          <StatLabel
            fontFamily="Poppins"
            fontWeight="700"
            color="#fff"
            fontSize="2xl"
          >
            Free Chat App
          </StatLabel>
          <StatNumber
            fontFamily="Poppins"
            fontWeight="400"
            color="#fff"
            fontSize="md"
          >
            You Can Chat With Your Friends Using This Key{" "}
            <Badge colorScheme="green">{generatedKey}</Badge>
          </StatNumber>
        </Stat>
        {messages &&
          messages.map((data) => {
            return <ChatBubble key={data.id} {...data} />;
          })}
        <div ref={lastMessageRef} />
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
          placeholder="Type your message . . ."
          color="#fff"
          _placeholder={{ color: "inherit", opacity: 0.5, fontWeight: 400 }}
          fontFamily="poppins"
          fontWeight={600}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <IconButton
          icon={<IoMdSend size="25px" color="#0084ff" />}
          type="submit"
          bg="transparent"
          _focus={0}
        />
      </Flex>
    </Flex>
  );
}
// just Done with chat bubble
function ChatBubble({ message, uid, createdAt }) {
  const { user } = useAuth();
  const isMe = uid === user.uid;
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
        {createdAt}
      </Text>
    </VStack>
  );
}

export default Chat;
