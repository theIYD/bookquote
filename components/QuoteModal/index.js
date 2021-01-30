import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Flex,
  Link,
  IconButton,
  Box,
  Divider,
  Button,
  Text,
} from "@chakra-ui/react";
import { FaAmazon } from "react-icons/fa";

export default function QuoteModal({
  quote,
  initialRef,
  finalRef,
  onClose,
  isOpen,
}) {
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>#{quote && quote.hashtag}</ModalHeader>
        <ModalBody>{quote && quote.content}</ModalBody>
        <ModalFooter
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex alignItems="center" justifyContent="space-around">
            <Link
              isExternal
              _focus={{ outline: "none" }}
              href={`https://www.amazon.in/s?k=${encodeURIComponent(
                quote && quote.bookName
              )}`}
            >
              <IconButton
                colorScheme="gray"
                size="sm"
                aria-label="Amazon"
                icon={<FaAmazon />}
              />
            </Link>
            <Box mx={2} height="30px">
              <Divider orientation="vertical" />
            </Box>
            <Text
              as="b"
              textColor="#ccc"
              textTransform="uppercase"
              fontSize="xs"
            >
              Posted by {quote && quote.user !== "G" ? quote.user : "Guest"}
            </Text>
          </Flex>
          <Button size="sm" colorScheme="messenger" onClick={onClose}>
            Okay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
