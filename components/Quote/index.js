import { Flex, GridItem, Text, IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
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
        height="12rem"
        cursor="pointer"
        onClick={() => selectedQuote(quote)}
      >
        <Image src="/quote.png" width={30} height={20} />
        <Text py={2} noOfLines={3} fontSize="lg" marginLeft={6}>
          {quote.content}
        </Text>
        <Text mt={2} fontSize="xs" w="100%" textAlign="right" as="i">
          - {quote.bookName}
        </Text>
        <IconButton size="xs" aria-label="Copy quote" icon={<CopyIcon />} />
      </Flex>
    </GridItem>
  );
};

export default Quote;
