import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Box,
  Heading,
  Flex,
  Text,
  Divider,
  Link as ChakraLink,
  IconButton,
} from "@chakra-ui/react";
import { ImEnter } from "react-icons/im";

const Index = () => {
  return (
    <Box pb={6}>
      <Box
        style={{
          background:
            "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,1)), url('/images/bg.jpg') repeat",
        }}
        w="100%"
        height="60vh"
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

            <Link href="/app">
              <IconButton
                mt={4}
                colorScheme="messenger"
                size="lg"
                icon={<ImEnter />}
              />
            </Link>
          </Flex>
        </Container>
      </Box>
      <Container d="flex" flexDirection="column">
        <Text
          letterSpacing={["-0.06em", "-0.06em", "-0.03em"]}
          fontSize="md"
          textAlign="justify"
          fontWeight="400"
        >
          It is a platform to showcase &amp; store quotes from your favourite
          reads. The goal of this project is to provide a personalised
          experience to readers wanting to save their favourite quotes which
          they come across daily &amp; have them accessed from anywhere on the
          internet.
        </Text>
        <Divider my={4} />
        <Text
          letterSpacing={["-0.06em", "-0.06em", "-0.03em"]}
          fontSize="md"
          textAlign="justify"
          fontWeight="400"
        >
          While the readers treasure their chosen quotes on their profile, they
          have the choice of having it <strong>listed publicly</strong> on the
          app.
        </Text>
        <br />
        <Text
          letterSpacing={["-0.06em", "-0.06em", "-0.03em"]}
          fontSize="md"
          textAlign="justify"
          fontWeight="400"
        >
          The project is completely open sourced for contributions &amp;
          improvements on{" "}
          <ChakraLink
            fontWeight="800"
            isExternal
            href="https://github.com/theIYD/bookquote"
          >
            Github
          </ChakraLink>
          .
        </Text>
        <Divider mt={4} />
        <Flex
          mt={4}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Text
            letterSpacing={["-0.06em", "-0.06em", "-0.03em"]}
            fontSize="md"
            fontWeight="400"
          >
            Made by{" "}
            <ChakraLink
              color="blue.400"
              fontWeight="800"
              href="https://theidrees.me"
              isExternal
            >
              @theIYD
            </ChakraLink>
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Index;
