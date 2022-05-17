import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from "../contexts/AuthContext";
import '../styles/globals.css';

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