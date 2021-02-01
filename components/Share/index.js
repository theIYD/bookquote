import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Flex,
  FormControl,
  Input,
  Textarea,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Switch,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { createQuote, editQuote } from "../../services/Quote";

export default function Share({ onClose, isOpen, edit }) {
  const [quote, setQuote] = useState((edit && edit.content) || "");
  const [book, setBook] = useState((edit && edit.bookName) || "");
  const [author, setAuthor] = useState((edit && edit.author) || "");
  const [isPublic, setIsPublic] = useState((edit && !!edit.isPublic) || true);
  const toast = useToast();
  const router = useRouter();

  let isSignedIn = false;
  let name = "",
    id = "";
  const user = parseCookies().user;
  if (user) {
    let parsedUser = JSON.parse(user);
    isSignedIn = parsedUser.isSignedIn;
    name = parsedUser.name;
    id = parsedUser.id;
  }

  const submitQuote = async (e) => {
    e.preventDefault();

    let postData = {
      bookName: book,
      authorName: author,
      content: quote,
      isPublic,
    };

    if (name && id) {
      postData["user"] = name;
      postData["id"] = id;
    }

    let data = null;
    if (edit && Object.keys(edit).length !== 0) {
      data = await editQuote(postData);
    } else {
      data = await createQuote(postData);
    }

    if (data && !data.error && data.message) {
      toast({
        title: data.message,
        status: "success",
        duration: 1000,
      });

      onClose();
      router.reload();
    } else if (data && data.error) {
      toast({
        title: "An error occurred",
        status: "error",
        duration: 2000,
      });
      onClose();
    }
  };

  return (
    <Modal preserveScrollBarGap onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent mx={4}>
        <form id="share" onSubmit={submitQuote}>
          <ModalHeader>Share a quote</ModalHeader>
          <ModalBody>
            <Flex flexDirection="column">
              <FormControl>
                <Textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Quote: "
                ></Textarea>
              </FormControl>
              <FormControl mb={2}>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  type="text"
                  placeholder="Author: "
                />
              </FormControl>
              <FormControl mb={2}>
                <Input
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
                  type="text"
                  placeholder="Book: "
                />
              </FormControl>
              {isSignedIn && (
                <FormControl display="flex" alignItems="center">
                  <FormLabel fontSize="sm" htmlFor="is-public" mb="0">
                    Global share ?
                  </FormLabel>
                  <Switch
                    onChange={() => setIsPublic(!isPublic)}
                    id="is-public"
                    defaultChecked={isPublic}
                    colorScheme="messenger"
                  />
                </FormControl>
              )}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm" colorScheme="messenger">
              Share
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
