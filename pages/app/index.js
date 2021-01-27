import { Container } from "@chakra-ui/react";

import Nav from "../../components/Nav";
import Quotes from "../../containers/Quotes";
import HeaderText from "../../components/HeaderText";

const BaseApp = () => {
  return (
    <Container maxWidth="960px">
      <Nav />
      <HeaderText text="hub of quotes." />
      <Quotes />
    </Container>
  );
};

export default BaseApp;
