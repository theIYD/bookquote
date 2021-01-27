import Link from "next/link";
import {
  Flex,
  Box,
  Heading,
  Spacer,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import Share from "../Share";

function Nav() {
  const { isOpen, onClose, onOpen } = useDisclosure();
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
          <Button size="sm" colorScheme="messenger" onClick={() => onOpen()}>
            Share
          </Button>
        </Box>
      </Flex>
      <Share isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default Nav;
