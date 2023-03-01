const firebaseConfig = {
  apiKey: "AIzaSyDRz5xrcq970WcwOb22LcaFxtj_hTVAXw0",
  authDomain: "smartdoorit5102-2bae0.firebaseapp.com",
  databaseURL: "https://smartdoorit5102-2bae0-default-rtdb.firebaseio.com",
  projectId: "smartdoorit5102-2bae0",
  storageBucket: "smartdoorit5102-2bae0.appspot.com",
  messagingSenderId: "442157027650",
  appId: "1:442157027650:web:5436b05172fbf1b7e778db"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var requestFormDB = firebase.database().ref("requestForm");

document.getElementById("requestForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var hotspotnameid = getElementVal("hotspotnameid");
  var hotspotpassid = getElementVal("hotspotpassid");

  saveMessages(name, hotspotnameid, hotspotpassid);

  //   enable sentAlert
  document.querySelector(".sentAlert").style.display = "block";

  //   remove the sentAlert
  setTimeout(() => {
    document.querySelector(".sentAlert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("requestForm").reset();
}

const saveMessages = (name, hotspotnameid, hotspotpassid) => {
  // var newrequestForm = requestFormDB.push();
  hotspotnameid = document.getElementById("hotspotnameid").value;

  var ref = firebase.database().ref("user_hotspots").child(hotspotnameid);
  ref.once("value").then(function (snapshot) {
    if (snapshot.exists()) {
      console.log("Reference name exists in the database.");
    } else {
      firebase.database().ref("user_hotspots").child(hotspotnameid).update({
        name: name,
        hotspotnameid: hotspotnameid,
        hotspotpassid: hotspotpassid,
        status: "pending",
      });
    }
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
