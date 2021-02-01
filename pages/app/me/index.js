import React from "react";
import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { Spinner, Flex } from "@chakra-ui/react";

import HeaderText from "../../../components/HeaderText";
import Quotes from "../../../containers/Quotes";

export default function Me() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = parseCookies().user;
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      setLoading(false);
    }
  }, []);

  return (
    <Container maxW="960px">
      {!loading ? (
        <>
          <HeaderText text="your quotes" />
          <Quotes user={user} />
        </>
      ) : (
        <Flex mt={2} justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </Container>
  );
}
