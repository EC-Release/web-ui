
this.onmessage = function (e) {
  fetch(e.data.api, {
      method: "GET",
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization':"Bearer " + e.data.authToken
       }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((respData) => {
          this.postMessage({
            initialResult: JSON.parse(JSON.stringify(respData)),
          });
        });
      }
    });
  
  setInterval(() => {
    fetch(e.data.api, {
      method: "GET",
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization':"Bearer " + e.data.authToken
       }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((respData) => {
          this.postMessage({
            result: JSON.parse(JSON.stringify(respData)),
          });
        });
      }
    });
  }, 300000);
};

