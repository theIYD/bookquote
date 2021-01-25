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
          <Link href="/app">Home</Link>
        </Box>
        <Box>
          <Link href="/app">Global</Link>
        </Box>
        <Box>
          <Button colorScheme="teal">Share</Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Nav;
