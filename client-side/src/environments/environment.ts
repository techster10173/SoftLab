// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_URL = 'http://127.0.0.1:5000/';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCz4WCF8tnHUFuiAo_ex6IVhF_S-0dhd-g',
    authDomain: 'softlab-6e579.firebaseapp.com',
    projectId: 'softlab-6e579',
    storageBucket: 'softlab-6e579.appspot.com',
    messagingSenderId: '34923867797',
    appId: '1:34923867797:web:ea933799db0ce51230b59c'
  },
  apiURL: {
    default: BASE_URL,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
