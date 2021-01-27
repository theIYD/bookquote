import { useState } from "react";
import { useRouter } from "next/router";
import {
  Flex,
  GridItem,
  Text,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { useClipboard, useToast } from "@chakra-ui/react";
import { FaTwitter, FaBook, FaEdit } from "react-icons/fa";
import { IoOptions } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { parseCookies } from "nookies";

import Share from "../Share";

const Quote = ({ quote, borderColor, selectedQuote }) => {
  const [copiedQuote] = useState(`${quote.content} - ${quote.bookName}`);
  const { onCopy } = useClipboard(copiedQuote);
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  let user = parseCookies().user;
  if (user) {
    user = JSON.parse(user);
  }

  const copyHandler = () => {
    onCopy();
    toast({
      title: "Copied!",
      status: "success",
      duration: 1000,
    });
  };

  const deleteQuote = async () => {
    const res = await fetch("/api/quote", {
      method: "DELETE",
      body: JSON.stringify({ quoteId: quote._id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data && !data.error && data.message) {
      toast({
        title: data.message,
        status: "success",
        duration: 1000,
      });
    }
  };

  return (
    <GridItem>
      <Flex
        shadow="lg"
        borderBottomRadius="lg"
        borderTop={`4px solid ${borderColor}`}
        p={4}
        flexDirection="column"
        alignItems="flex-start"
        height="11rem"
      >
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <Image src="/quote.png" width={30} height={20} />
          <IconButton
            size="xs"
            aria-label="Show"
            isRound
            onClick={() => selectedQuote(quote)}
            icon={<BiShow />}
          />
        </Flex>
        <Text py={2} noOfLines={3} fontSize="lg">
          {quote.content}
        </Text>
        <Flex
          marginTop="auto"
          alignItems="center"
          justifyContent="space-between"
          w="100%"
        >
          <Flex>
            <IconButton
              size="xs"
              aria-label="Copy"
              icon={<CopyIcon />}
              onClick={() => copyHandler()}
              mr={2}
            />
            <Link
              isExternal
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `${'"' + quote.content + '"' + "\n\nfrom " + quote.bookName}`
              )}`}
            >
              <IconButton
                colorScheme="twitter"
                size="xs"
                aria-label="Twitter"
                icon={<FaTwitter />}
              />
            </Link>
            {user && user.isSignedIn && router.pathname === "/app/me" && (
              <Menu closeOnBlur>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<IoOptions />}
                  size="xs"
                  ml={2}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem onClick={() => onOpen()} icon={<FaEdit />}>
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => deleteQuote()}
                    icon={<AiFillDelete />}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Flex alignItems="center">
            <FaBook />
            <Text ml="1" fontSize="xs" w="100%" textAlign="right" as="i">
              {quote.bookName}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Share isOpen={isOpen} onClose={onClose} edit={quote} />
    </GridItem>
  );
};

export default Quote;
