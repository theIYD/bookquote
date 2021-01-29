import { useState, useRef } from "react";
import {
  Grid,
  Box,
  Flex,
  Button,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import fetcher from "../../utils/fetcher";

import Quote from "../../components/Quote";
import QuoteModal from "../../components/QuoteModal";
import colors from "./colors";

export default function Quotes({ user }) {
  let url = "";
  if (user) {
    url = `/api/quote?me=${user.id}&page=`;
  } else {
    url = "/api/quote?page=";
  }

  const fetchQuotes = ({ pageParam = 0 }) => fetcher(url + pageParam);

  const {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("quotes", fetchQuotes, {
    getNextPageParam: (lastPage, _pages) => {
      if (lastPage.quotes.length !== 0) {
        return lastPage.nextPage;
      } else return undefined;
    },
  });

  const [quote, setQuote] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();

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
      <Flex
        flexDirection="column"
        mt={2}
        mb={4}
        alignItems="center"
        justifyContent="center"
      >
        {hasNextPage ? (
          <Button size="xs" onClick={() => fetchNextPage()}>
            Show more
          </Button>
        ) : (
          <Text>Ahh, we don't have more.. 😞</Text>
        )}
        {isFetching && !isFetchingNextPage ? <Spinner /> : null}
      </Flex>
      <QuoteModal
        initialRef={initialRef}
        finalRef={finalRef}
        onClose={onClose}
        isOpen={isOpen}
        quote={quote}
      />
    </Box>
  );
}
