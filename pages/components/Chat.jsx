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
  } from "@chakra-ui/react";
  import { IoMdSend } from "react-icons/io";
  import { useState } from "react";
  
  
  
  
  const messages = [
    {
      message: "sdfsdfsdfdsf",
      from: "others",
      dateSent: "20:21",
    },
    {
      message: "Sure! At 11:00 am?",
      from: "me",
      dateSent: "20:22",
    },
    {
      message: "That's too early! How about at noon?",
      from: "others",
      dateSent: "20:22",
    },
    {
      message: "That sounds good as well. Where should we meet?",
      from: "me",
      dateSent: "20:23",
    },
    {
      message: "Meet me at the hardware store on 21 Duck Street.",
      from: "others",
      dateSent: "20:23",
    },
    {
      message: "Sounds good. I'll bring my friend with me as well!",
      from: "me",
      dateSent: "20:24",
    },
    {
      message: "Which one? The developer or the designer?",
      from: "others",
      dateSent: "20:24",
    },
    {
      message: "The developer. You remember Tony, right?",
      from: "me",
      dateSent: "20:24",
    },
    {
      message: "Yeah! Tony's a great guy!",
      from: "others",
      dateSent: "20:25",
    },
    {
      message: "Indeed he is! Alright, see you later 👋!",
      from: "me",
      dateSent: "20:25",
    },
  ];
  
  function Chat() {
    const [msg, setMsg] = useState("");
    const [msgArray, setMsgArray] = useState(messages);
    const handleMsgSubmit = () => {
      const d = new Date().toLocaleTimeString();
      let tempMsgArray = [...msgArray, {message: msg, from: 'me', dateSent: d}]
      setMsgArray(tempMsgArray);
      setMsg('');
    };
    return (
      <Flex w="full" flexDirection="column">
        <HStack p={4} borderBottomColor="gray.100">
          <Input variant="filled" rounded="full" placeholder="Search friends" />
        </HStack>
        <Flex px={6} overflowY="auto" flexDirection="column" flex={1}>
          <Stat mt={6}>
            <StatLabel color="gray.500">Chatting with</StatLabel>
            <StatNumber>Dina Harrison</StatNumber>
          </Stat>
          {msgArray.map((data, index) => {
            return <ChatBubble key={index} {...data} />;
          })}
        </Flex>
        <Flex pl={4} pr={2} py={2} borderTopColor="gray.100" borderTopWidth={1}>
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
            onClick={handleMsgSubmit}
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
  
  