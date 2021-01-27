import { Flex, Heading } from "@chakra-ui/react";

export default function HeaderText({ text }) {
  return (
    <Flex justifyContent="center" alignItems="center" my={6}>
      <Heading letterSpacing="-0.09em" as="h1" size="3xl" fontWeight="800">
        {text}
      </Heading>
    </Flex>
  );
}
