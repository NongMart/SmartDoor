const firebaseConfig = {
  apiKey: "AIzaSyBsmJrwR4TiIIezxC94aGF4-Cdb7RppUhY",
  authDomain: "smartdoorit5102-d53ff.firebaseapp.com",
  databaseURL: "https://smartdoorit5102-d53ff-default-rtdb.firebaseio.com",
  projectId: "smartdoorit5102-d53ff",
  storageBucket: "smartdoorit5102-d53ff.appspot.com",
  messagingSenderId: "735550711784",
  appId: "1:735550711784:web:fe4dea8899f8f1007ee65d"
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
