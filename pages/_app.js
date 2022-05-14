import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    
  )
}

export default MyApp