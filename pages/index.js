import { Center, Tooltip, Heading } from "@chakra-ui/react"


function index() {
  return (
    <Center height='100vh'>
      <Tooltip label="first real commit">
        <Heading cursor='pointer'>Hello World</Heading>
      </Tooltip>
    </Center>
  )
}

export default index