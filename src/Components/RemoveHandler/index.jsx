export const RemoveHandler = (url, data, setItems) => {
  const fetchUrl = `${url}/${data.id}`;
  const httpMethod = "DELETE";

  return fetch(fetchUrl, {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setItems((prevState) => prevState.filter((item) => item.id !== data.id));
    });
};
