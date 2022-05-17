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
import { db } from "../firebase";
import { addDoc, collection, orderBy } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { query, where } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";



function Chat({generatedKey}) {
  const { user } = useAuth();
  
  // ---------getting data--------//

  const messagesRef = collection('messages');
  const query = query(messagesRef, where('keygen', '==', generatedKey), orderBy('createdAt'))

  const [messages] = useCollectionData(query, {idField: 'id'})

  // ------------getting data---------//
  const [msgCount, setMsgCount] = useState(0);
  const [chatWithUsername, setChatWithUsername] = useState("");
  const [msg, setMsg] = useState("");
  const lastMessageRef = useRef(null);

  const chatWithUsernameGen = () => {
    let randomValue = Math.floor(Math.random() * 10000);
    setChatWithUsername("username-" + randomValue);
  };

  // -------------handling the submit----------//
  const handleMsgSubmit = (e) => {
    e.preventDefault();
    const d = new Date().toLocaleTimeString();
    if (msg) {
      const colRef = collection(db, 'messages');
      addDoc(colRef, {message: msg, from: user.uid, createdAt: serverTimestamp(), keygen: generatedKey})
      setMsg("");
      setMsgCount(msgCount+1)
    } else {
      setMsg("");
    }
  };
  // -------------------handling the submit---------//

  useEffect(() => {
    chatWithUsernameGen();
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        {messages.map((data) => {
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
// just Done with chat bubble
function ChatBubble({ message, uid, createdAt }) {
  const {user} = useAuth();
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
