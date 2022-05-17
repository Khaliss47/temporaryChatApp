import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    
      
        <AuthProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </AuthProvider>
      
    
  )
}

export default MyApp