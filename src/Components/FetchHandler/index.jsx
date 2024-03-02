export const FetcHandler = (method, data, setItems, items, url) => {
  const fetchUrl = method === "Update" ? `${url}/${data.id}` : `${url}`;
  const httpMethod = method === "Update" ? "PATCH" : "POST";

  return fetch(fetchUrl, {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (method === "Update") {
        setItems((prevState) =>
          prevState.map((item) => (item.id === res.id ? res : item))
        );
      } else {
        setItems((prevState) => [...prevState, res]);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
