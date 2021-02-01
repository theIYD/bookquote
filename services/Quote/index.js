const API_QUOTE = "/api/quote";

export const deleteQuote = async (quoteId) => {
  const res = await fetch(API_QUOTE, {
    method: "DELETE",
    body: JSON.stringify({ quoteId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const createQuote = async (data) => {
  const res = await fetch(API_QUOTE, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resultantData = await res.json();
  return resultantData;
};

export const editQuote = async (data) => {
  const res = await fetch(API_QUOTE, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resultantData = await res.json();
  return resultantData;
};
