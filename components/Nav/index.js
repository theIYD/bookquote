import Link from "next/link";
import { Flex, Box, Heading, Spacer, Button } from "@chakra-ui/react";

function Nav() {
  return (
    <Flex borderBottom="1px solid #eee" py="4">
      <Box p="2">
        <Heading size="md">BookQuote</Heading>
      </Box>
      <Spacer />
      <Flex w="30%" align="center" justifyContent="space-around">
        <Box>
          <Link href="/">Home</Link>
        </Box>
        <Box>
          <Link href="/app">Quotes</Link>
        </Box>
        <Box>
          <Link href="/app/quote">
            <Button size="sm" colorScheme="messenger">
              Share
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Nav;
