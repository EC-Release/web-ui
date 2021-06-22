if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => {
        console.log("Service Worker Registered");
      })
      .catch((err) => console.log(`Service Worker error : ${err}`));
  });
}

 System.config({
        transpiler: 'babel',
        baseURL: '',
        map: {
          babel: 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js',
          react: 'https://unpkg.com/react@17/umd/react.production.min.js',
          'react-dom': 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
          uuid: "https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuid.min.js"
        },
        babelOptions: {
          compact: true
        }
      });

      // loads
      System.import('assets/xcalrWebUI.js');
