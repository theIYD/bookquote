import { Flex, GridItem, Text } from "@chakra-ui/react";
import Image from "next/image";

const Quote = ({ quote, borderColor, selectedQuote }) => {
  return (
    <GridItem className="content">
      <Flex
        shadow="lg"
        borderBottomRadius="lg"
        borderTop={`4px solid ${borderColor}`}
        p={4}
        flexDirection="column"
        alignItems="flex-start"
        height="10rem"
        onClick={() => selectedQuote(quote)}
      >
        <Image src="/quote.png" width={30} height={20} />
        <Text noOfLines={3} fontSize="lg" marginLeft={6}>
          {quote.content}
        </Text>
        <Text mt={2} fontSize="xs" w="100%" textAlign="right" as="i">
          - {quote.bookName}
        </Text>
      </Flex>
    </GridItem>
  );
};

export default Quote;
