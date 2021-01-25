import { Flex, GridItem, Badge, Text } from "@chakra-ui/react";
import Image from "next/image";

const Quote = ({ quote }) => {
  return (
    <GridItem className="content" w="18rem">
      <Flex
        shadow="lg"
        borderBottomRadius="lg"
        borderTop="4px solid #000"
        p={4}
        flexDirection="column"
        alignItems="flex-start"
      >
        <Image src="/quote.png" width={30} height={20} />
        <Text fontSize="lg" marginLeft={6}>
          {quote.content}
        </Text>
        <Text fontSize="xs" w="100%" textAlign="right" as="i">
          - {quote.bookName}
        </Text>

        {/* <Badge borderRadius="full" px="3" py="1" colorScheme="teal">
                    {quote.user === "G" && "GUEST"}
                </Badge> */}
      </Flex>
    </GridItem>
  );
};

export default Quote;
