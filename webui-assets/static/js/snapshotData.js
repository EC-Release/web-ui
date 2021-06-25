(function fetchSnapShotData(){
        let authToken = this.getToken('ec-config');
        let baseURL = '/v1.2beta/ops/api/';

        let apiEndPoint=  '/v1.2beta/ops/api/snapshot'    //"https://reqres.in/api/users/2"  //baseUrl -this.state.apiEndPoints.baseUrl + '/snapshot'
          fetch(apiEndPoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer " + authToken
            }
          })
          .then((response) => {
              if (response.status === 200) {
                response.json().then((respData) => {
                  let data = respData["ab2a2691-a563-486c-9883-5111ff36ba9b"]
                  sessionStorage.setItem("snapshotData", JSON.stringify(respData))
                });
           }})
      })();

      function getToken(name){
        var cookieName = name+"=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(cookieName) == 0) {
              return c.substring(cookieName.length, c.length);
            }
      }
      }
