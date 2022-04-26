// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let environment = {
  apiUrl: /*'http://localhost:4201/api'*/  'https://node-server-seven.vercel.app/api',
  production: false
};
/*
let urlExists = new Promise(function(resolve, reject) {
  fetch('http://localhost:4201/api', {mode: "no-cors"}).then(res => resolve(true)).catch(err => resolve(false))
  });
*/

/*
urlExists.then(function(result){ 
  //console.log(result)
});
*/
/*
urlExists('http://localhost:4201/api').then(result => {
  environment.apiUrl = result ? 'http://localhost:4201/api' : 'https://node-app-api.glitch.me/api'
  console.log(environment.apiUrl)
})*/
//console.log(environment)
export {environment}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
