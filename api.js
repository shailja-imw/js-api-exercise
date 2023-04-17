let baseURl = "https://httpbin.org/";

async function getApi() {
  console.time("time");
  const uuid = await fetch(baseURl + "uuid").then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      return Promise.reject("error", resp);
    }
  });
  fetch(baseURl + "/delay/10").then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      return Promise.reject("err", resp);
    }
  });

  const anything = await fetch(baseURl + "anything", {
    method: "POST",
    body: JSON.stringify({
      data: uuid,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((resp) => {
      return resp?.json();
    })
    .catch((err) => {
      console.error("err", err);
    });
  console.log("anything response", anything?.json?.data?.uuid);
  console.timeEnd("time");
}
getApi();