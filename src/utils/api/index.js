import axios from 'axios';

function getActivity(){ 
  return {
    'test': '1',
    'dsd': '2'
  }
}

function fetchEmails(){
  return axios.request({
    url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/311743/dummy-emails.json",
    method: "GET"
  }).then(function(response) {
    return response.data;
  })
}

const saveActivity = () => {
    // get recent activity from firebase
};

export {
    getActivity,
    saveActivity,
    fetchEmails
};