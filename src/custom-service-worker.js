self.addEventListener( 'fetch',  e =>{
    console.log(`intercepting ${e.request.method} to ${e.request.url}`)
 }
)