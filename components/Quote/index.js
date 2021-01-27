import { useState } from "react";
import { Flex, GridItem, Text, IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { useClipboard, useToast } from "@chakra-ui/react";

const Quote = ({ quote, borderColor, selectedQuote }) => {
  const [copiedQuote, setCopiedQuote] = useState(
    `${quote.content} - ${quote.bookName}`
  );
  const { onCopy } = useClipboard(copiedQuote);
  const toast = useToast();

  const onClickItem = (e) => {
    if (
      e.target.getAttribute("aria-label") === "Copy quote" ||
      e.target instanceof SVGElement
    ) {
      onCopy();
      toast({
        title: "Copied!",
        status: "success",
        duration: 1000,
      });
    } else {
      selectedQuote(quote);
    }
  };

  return (
    <GridItem onClick={onClickItem}>
      <Flex
        shadow="lg"
        borderBottomRadius="lg"
        borderTop={`4px solid ${borderColor}`}
        p={4}
        flexDirection="column"
        alignItems="flex-start"
        height="12rem"
        cursor="pointer"
      >
        <Image src="/quote.png" width={30} height={20} />
        <Text py={2} noOfLines={3} fontSize="lg">
          {quote.content}
        </Text>
        <Text mt={2} fontSize="xs" w="100%" textAlign="right" as="i">
          - {quote.bookName}
        </Text>
        <Flex marginTop="auto">
          <IconButton size="sm" aria-label="Copy quote" icon={<CopyIcon />} />
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default Quote;
