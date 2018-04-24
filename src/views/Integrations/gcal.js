// import request from 'superagent'

// // AIzaSyA-iQAxB5V3sa6M3-5hl6iLGtwB0HUAwiU	
// // const CALENDAR_ID = 'tb8ckdrm61bdsj6jfm7khob4u5@group.calendar.google.com'
// const CALENDAR_ID = 'ebaasdd@parrotscribe.com'
// // const API_KEY = 'AIzaSyAOuDzSlG24RPBn3OKVAyjW3OK_EJhCUbp'
// const API_KEY = 'AIzaSyA-iQAadxB5V3sa6M3-5hl6iLGtwB0HUAwiU'
// let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`


// function handleClientLoad() {
//   // Loads the client library and the auth2 library together for efficiency.
//   // Loading the auth2 library is optional here since `gapi.client.init` function will load
//   // it if not already loaded. Loading it upfront can save one network request.
//   gapi.load('client:auth2', initClient);
// }

// function initClient() {
//   // Initialize the client with API key and People API, and initialize OAuth with an
//   // OAuth 2.0 client ID and scopes (space delimited string) to request access.
//   gapi.client.init({
//       apiKey: 'AIzaSyCuVZ5r-xOD3dVxJeLxTe4IdmvpAoIyTN8',
//       discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
//       clientId: '569065401591-2mao31n3o06mutsh1tg3f77rro70s1hb.apps.googleusercontent.com',
//       scope: 'profile'
//   }).then(function () {
//     // Listen for sign-in state changes.
//     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

//     // Handle the initial sign-in state.
//     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//   });
// }

// function updateSigninStatus(isSignedIn) {
//   // When signin status changes, this function is called.
//   // If the signin status is changed to signedIn, we make an API call.
//   if (isSignedIn) {
//     makeApiCall();
//   }
// }

// function handleSignInClick(event) {
//   // Ideally the button should only show up after gapi.client.init finishes, so that this
//   // handler won't be called before OAuth is initialized.
//   gapi.auth2.getAuthInstance().signIn();
// }

// function handleSignOutClick(event) {
//   gapi.auth2.getAuthInstance().signOut();
// }

// function makeApiCall() {
//   // Make an API call to the People API, and print the user's given name.
//   gapi.client.people.people.get({
//     'resourceName': 'people/me',
//     'requestMask.includeField': 'person.names'
//   }).then(function(response) {
//     console.log('Hello, ' + response.result.names[0].givenName);
//   }, function(reason) {
//     console.log('Error: ' + reason.result.error.message);
//   });
// }

// export function signInGoogle(callback){
//   handleClientLoad();
// }