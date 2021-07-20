this.onmessage = function (e) {
   getUserRole(e);
};


function getUserRole(e){
 fetch(e.data.userApi, {
      method: "GET",
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization':"Bearer " + e.data.authToken
       }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((respData) => {
          console.log(respData)
          this.postMessage({
            user: respData,
          });
        });
      }
    });
}
