import Image from "next/image";
import { Container, Box, Heading, Flex, Button } from "@chakra-ui/react";
import { ImEnter } from "react-icons/im";

const Index = () => {
  return (
    <>
      <Box
        style={{
          background:
            "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,1)), url('/images/bg.jpg') repeat",
        }}
        w="100%"
        height="45vh"
      >
        <Container
          d="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          maxWidth="960px"
        >
          <Flex flexDirection="column" alignItems="center">
            <Image src="/images/logo.svg" width="60px" height="60px" />
            <Heading
              letterSpacing={["-0.06em", "-0.06em", "-0.09em"]}
              as="h1"
              size="4xl"
            >
              Bookquote
            </Heading>
            <Button
              mt={4}
              colorScheme="messenger"
              size="md"
              leftIcon={<ImEnter />}
            >
              Enter
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Index;
