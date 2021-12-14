const worker = () => {
  /* eslint-disable-next-line no-restricted-globals */
  self.onmessage = (e) => {
    getSnapData(e);
    setInterval(() => {
      getSnapData(e);
    }, 300000);
  };
  function getSnapData(e) {
    /* eslint-disable-next-line no-restricted-globals */
    var self = this;
    const absoluteUrl = new URL(e.data.api, e.data.currentLocation);
    fetch(absoluteUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + e.data.authToken,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((respData) => {
          /* eslint-disable-next-line no-restricted-globals*/
          self.postMessage({
            result: JSON.parse(JSON.stringify(respData)),
          });
        });
      }
    });
  }
};

export default worker;
