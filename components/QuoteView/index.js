import { useEffect } from "react";
import { useQuery } from "react-query";
import { Badge, Spinner, StatNumber } from "@chakra-ui/react";
import { GrFormView } from "react-icons/gr";

import fetcher from "../../utils/fetcher";

export default function QuoteView({ quoteId }) {
  const fetchViews = (id) => fetcher("/api/view?quoteId=" + id);

  const { data, error, isError, isLoading } = useQuery("views", () =>
    fetchViews(quoteId)
  );

  useEffect(() => {
    const postView = async () => {
      const res = await fetch("/api/view", {
        method: "POST",
        body: JSON.stringify({ quoteId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await res.json();
    };
    postView();
  }, []);

  if (isLoading) {
    return <Spinner size="xs" />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Badge
      d="flex"
      flexDirection="row"
      alignItems="center"
      colorScheme="purple"
      fontSize="1rem"
    >
      <GrFormView color="purple" />
      <StatNumber>{data.views}</StatNumber>
    </Badge>
  );
}
