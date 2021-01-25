import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Container: {
      sizes: {
        lg: {
          maxWidth: "960px",
        },
      },
    },
  },
});

export default theme;
