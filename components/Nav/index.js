import Link from "next/link";
import { Flex, Box, Heading, Spacer, Button } from "@chakra-ui/react";

function Nav() {
  return (
    <Flex borderBottom="1px solid #eee" py="4">
      <Box p="2">
        <Heading size="md">
          <Link href="/">BookQuote</Link>
        </Heading>
      </Box>
      <Spacer />
      <Flex align="center" justifyContent="space-around">
        <Box mr={6}>
          <Link href="/app">Home</Link>
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
