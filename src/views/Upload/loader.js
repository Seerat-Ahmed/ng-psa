import request from 'superagent'
import $ from 'jquery';
// AIzaSyA-iQAxB5V3sa6M3-5hl6iLGtwB0HUAwiU	
// const CALENDAR_ID = 'tb8ckdrm61bdsj6jfm7khob4u5@group.calendar.google.com'
const CALENDAR_ID = 'ebaasdd@parrotscribe.com'
// const API_KEY = 'AIzaSyAOuDzSlG24RPBn3OKVAyjW3OK_EJhCUbp'
const API_KEY = 'AIzaSyA-iQAadxB5V3sa6M3-5hl6iLGtwB0HUAwiU'
// let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
// let url = 'http://188.226.149.166:5000/api/live/audio_file'
let url = 'http://0.0.0.0:5000/test/api/transform'
export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          events.push({
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
          })
        })
        callback(events)
      }
    })
}

// Pass important callbacks
// TODO: 
// 1. Its Ugly, must change to statefull
// 2. Incoming should be encapsulated in some worker
export var statusEnum = {
  SUCCESS: 1,
  FAILURE: 2
};

export function uploadFiles(datafile,callback){
  // create form data
  var formData = new FormData();
  formData.append("file", datafile);
  formData.append("name","Ebad");
  formData.append("email","ebad@parrotscribe.com");
  formData.append("format","wav");                        

  // var cleanedText = "0.29 - 1.05 : Speaker#2 :good morning 1.99 - 4.72 : Speaker#1 :this is my first product launch 4.8 - 14.43 : Speaker#2 :since being named CEO I'm sure you didn't know about and it is a pleasure to host you today 15.95 - 21.58 : Speaker#1 :I love apple and I consider the privilege of a lifetime 22.12 - 22.33 : Speaker#2 :to 22.36 - 27.73 : Speaker#1 :work here for almost fourteen years and I am very excited about this new role 30.08 - 34.15 : Speaker#2 :I wanna expressly welcome you to this campus 34.99 - 42.47 : Speaker#1 :%HESITATION this campus serves as a kind of second home for many of us it's a sort of like inviting you into our home 43.7 - 48.51 : Speaker#2 :in particular I want to welcome you to this room 49.2 - 54.87 : Speaker#1 :that we call our town hall %HESITATION this room town hall has quite 54.9 - 55.68 : Speaker#2 :a history 55.71 - 56.31 : Speaker#1 :of apple"

  request
  .post(url)
  .send(formData)
  .then((err, data) => {
      console.log('error is : '+err);
      console.log('data is : '+data);      
      if (data.results.status == 'failure'){
          // callback
          callback(statusEnum.FAILURE,data.results.message); 
      }else{
      //  if (data.results.status == 'success'){
          // Parse all the results in the 
          var cleanedData = data.results.message.replace(/(: Speaker#)\w+/g," ");
          callback(statusEnum.SUCCESS,cleanedData); 
      }
    
  })
  .catch(function (err) {
    console.log('Some error '+ err);
    callback(statusEnum.FAILURE,'Error is :'+err);

  });
}


export function uploadRawFile(datafile,callback){
  // create form data
  var formData = new FormData();
  formData.append("filename", datafile);
  formData.append("name","Ebad");
  formData.append("email","ebad@parrotscribe.com");
  formData.append("format","wav");                        

  // url: 'http://188.226.149.166:5000/api/live/audio_file',
  $.ajax({
    type: "POST",
    url: 'http://0.0.0.0:5000/test/api/transform',
    data: formData,
    contentType: false,
    async: true,
    cache : false,
    processData: false,
    dataType : 'json',
    success: function(data){

          if (data.results.status == 'failure'){
            console.log(data.results.message);
            callback(statusEnum.FAILURE,data.results.message)

          }else if (data.results.status == 'success'){
              // Parse all the results in the 
              console.log(data.results.message);     
              var cleanedData = data.results.message.replace(/(: Speaker#)\w+/g," ");
                      
              callback(statusEnum.SUCCESS,cleanedData)
          }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      // $("#loader").remove();
      // $("#res2").html("Error : "+XMLHttpRequest.msg);
      console.log(XMLHttpRequest);
      console.log(XMLHttpRequest.msg);    
      callback(statusEnum.FAILURE,errorThrown)

    }
  });



}