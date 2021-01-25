import { Container } from "@chakra-ui/react";

import Nav from "../../components/Nav";
import Quotes from "../../containers/Quotes";

const BaseApp = () => {
  return (
    <Container maxWidth="960px">
      <Nav />
      <Quotes />
    </Container>
  );
};

export default BaseApp;
