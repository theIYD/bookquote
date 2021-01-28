import Image from "next/image";
import Link from "next/link";
import { Container, Box, Heading, Flex, Button, Text } from "@chakra-ui/react";
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
        height="100vh"
      >
        <Container
          d="flex"
          alignItems="center"
          justifyContent="center"
          h="80%"
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
            <Text
              textAlign="center"
              letterSpacing={["-0.06em", "-0.06em", "-0.06em"]}
              fontSize="2xl"
              fontWeight="800"
            >
              A platform to showcase &amp; store quotes from books which you
              read.
            </Text>
            <Link href="/app">
              <Button
                mt={4}
                colorScheme="messenger"
                size="md"
                leftIcon={<ImEnter />}
              >
                Enter
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Index;
