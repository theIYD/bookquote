import { useState } from "react";
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

export default function Share({ onClose, isOpen }) {
  const [quote, setQuote] = useState("");
  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [isPublic, setIsPublic] = useState(false);
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

    const res = await fetch("/api/quote", {
      method: "POST",
      body: JSON.stringify(postData),
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
      <ModalContent>
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
                    onChange={(e) => setIsPublic(!isPublic)}
                    id="is-public"
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
