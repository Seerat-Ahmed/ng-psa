import request from 'superagent'

// AIzaSyA-iQAxB5V3sa6M3-5hl6iLGtwB0HUAwiU	
// const CALENDAR_ID = 'tb8ckdrm61bdsj6jfm7khob4u5@group.calendar.google.com'
const CALENDAR_ID = 'ebaasdd@parrotscribe.com'
// const API_KEY = 'AIzaSyAOuDzSlG24RPBn3OKVAyjW3OK_EJhCUbp'
const API_KEY = 'AIzaSyA-iQAadxB5V3sa6M3-5hl6iLGtwB0HUAwiU'
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

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