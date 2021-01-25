import { useEffect } from "react";
import { Grid, Box } from "@chakra-ui/react";
import useSwr from "swr";
import fetcher from "../../utils/fetcher";

import Quote from "../../components/Quote";

export default function Quotes() {
  const { data, error } = useSwr("/api/quote", fetcher);

  useEffect(() => {
    resizeAllGridItems();
  }, [data]);

  const resizeGridItem = (item) => {
    const grid = document.querySelector("#grid");
    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    const rowSpan = Math.ceil(
      (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    item.style.gridRowEnd = "span " + rowSpan;
  };

  function resizeAllGridItems() {
    let allItems = document.getElementsByClassName("item");
    for (let x = 0; x < allItems.length; x++) {
      resizeGridItem(allItems[x]);
    }
  }

  if (error) return "An error has occurred.";
  else if (!data) return "Loading...";
  else if (data && data.quotes)
    return (
      <Grid
        gap="10px"
        mt={4}
        templateColumns="repeat(auto-fit, minmax(18.4375rem, 1fr))"
        autoRows="20px"
        id="grid"
      >
        {data &&
          data.quotes &&
          data.quotes.map((quote, index) => (
            <Box key={index} className="item">
              <Quote quote={quote} />
            </Box>
          ))}
      </Grid>
    );
}
