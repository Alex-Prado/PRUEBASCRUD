export const APIurl = async (
  url,
  action,
  typeJson = true,
  body = false,
  element = false
) => {
  let formdata = null;
  if (body) {
    formdata = new FormData(body);
  } else {
    formdata = new FormData();
    if (element) {
      formdata.append(element.key, element.value);
    }
  }

  formdata.append("action", action);
  const data = await fetch(url, {
    method: "POST",
    body: formdata,
  }).then((dato) => (typeJson ? dato.json() : dato.text()));
  return data;
};
