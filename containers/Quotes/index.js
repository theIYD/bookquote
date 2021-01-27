import { useState } from "react";
import {
  Grid,
  Box,
  Modal,
  Flex,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import useSwr from "swr";
import fetcher from "../../utils/fetcher";

import Quote from "../../components/Quote";

export default function Quotes() {
  const { data, error } = useSwr("/api/quote", fetcher);
  const [quote, setQuote] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  if (error) return "An error has occurred.";
  else if (!data)
    return (
      <Flex alignItems="center" justifyContent="center">
        <Spinner />
      </Flex>
    );
  else if (data && data.quotes)
    return (
      <Grid
        gap={4}
        mt={4}
        templateColumns="repeat(auto-fit, minmax(18.4375rem, 1fr))"
        id="grid"
      >
        {data &&
          data.quotes &&
          data.quotes.map((quote, index) => {
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
          })}
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>#{quote && quote.hashtag}</ModalHeader>
            <ModalBody>{quote && quote.content}</ModalBody>
            <ModalFooter>
              <Button size="sm" colorScheme="messenger" onClick={onClose}>
                Okay
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Grid>
    );
}
