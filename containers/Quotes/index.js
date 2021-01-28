import { useState, useRef } from "react";
import {
  Grid,
  Box,
  Modal,
  Flex,
  IconButton,
  Link,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Spinner,
  Divider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
// import useSwr from "swr";
import { useInfiniteQuery } from "react-query";
import fetcher from "../../utils/fetcher";
import { FaAmazon } from "react-icons/fa";

import Quote from "../../components/Quote";

export default function Quotes({ user }) {
  let url = "";
  if (user) {
    url = `/api/quote?me=${user.id}&page=`;
  } else {
    url = "/api/quote?page=";
  }

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const fetchQuotes = ({ pageParam = 0 }) => fetcher(url + pageParam);

  const {
    data,
    error,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("quotes", fetchQuotes, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.quotes.length === 0) {
        setHasMore(false);
      }
      return;
    },
  });

  // const { data, error } = useSwr(url, fetcher);
  const [quote, setQuote] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();

  const colors = [
    "#000000",
    "#718096",
    "#E53E3E",
    "#DD6B20",
    "#F6E05E",
    "#68D391",
    "#4FD1C5",
    "#63B3ED",
    "#76E4F7",
    "#B794F4",
    "#F687B3",
  ];

  return status === "loading" ? (
    <Flex mt={2} alignItems="center" justifyContent="center">
      <Spinner />
    </Flex>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <Box py={4}>
      <Grid
        gap={4}
        mb={4}
        templateColumns="repeat(auto-fit, minmax(18.4375rem, 1fr))"
        id="grid"
      >
        {data.pages.map((page) => {
          return page.quotes.map((quote, index) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
              <Box key={index} className="item">
                <Quote
                  selectedQuote={(quote) => {
                    setQuote(quote);
                    onOpen();
                  }}
                  borderColor={color}
                  quote={quote}
                />
              </Box>
            );
          });
        })}
        {data && data.pages && data.pages.length === 0 && (
          <Flex alignItems="center" justifyContent="center">
            <Text fontSize="md">
              {!!user
                ? "Share your first quote with us 👆"
                : "Come back again soon..."}
            </Text>
          </Flex>
        )}
      </Grid>
      <Flex mt={2} mb={4} alignItems="center" justifyContent="center">
        {hasMore ? (
          <Button
            size="xs"
            onClick={() => {
              const newPage = page + 1;
              setPage(newPage);
              fetchNextPage({ pageParam: newPage });
            }}
          >
            Show more
          </Button>
        ) : (
          <Text>Ahh, we don't have more.. 😞</Text>
        )}
        {isFetching && !isFetchingNextPage ? <Spinner /> : null}
      </Flex>
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
        <ModalContent>
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
    </Box>
  );
}
