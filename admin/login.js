var $$ = function( id ) { return document.getElementById( id ); };
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLb876mEJiDh4ZDQus9So0S27ZBKDhBBY",
  authDomain: "tndream-858b4.firebaseapp.com",
  databaseURL: "https://tndream-858b4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tndream-858b4",
  storageBucket: "tndream-858b4.appspot.com",
  messagingSenderId: "285229321879",
  appId: "1:285229321879:web:aa4b297fec1178dab763d2"
  };
  firebase.initializeApp(firebaseConfig);
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  
  // Function to trigger phone authentication
  function authenticateWithPhoneNumber() {
    var phoneNumber ="+94"+parseInt( $$('pnnum').value) // Replace with actual phone number
    var appVerifier = window.recaptchaVerifier;
  $$("btns").innerText = "Verify"
  $$("btns").style,disabled = true

  setTimeout(() => {
    $$("btns").style,disabled = false
  }, 3000);
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        console.log("OTP sent successfully!");
        $$("otpar").style.display="block"
        $$("recaptcha-container").style.display="none"
  $$("btns").innerText = "Sign in"

      })
      .catch(function (error) {
        console.error("Error while sending OTP: ", error);
        Toast.fire({
            icon: 'error',
            title: error
          })
      });
  }
  
  // Function to verify OTP and sign in the user
  function verifyOTPAndSignIn() {
    var verificationCode = document.getElementById("verificationCode").value;
  
    window.confirmationResult.confirm(verificationCode)
      .then(function (result) {
        Toast.fire({
            icon: 'success',
            title: "User signed in successfully!"
          })
          location.replace("/")
        console.log("User signed in successfully!");
        var user = result.user;
        // Redirect the user to the dashboard or home page
      })
      .catch(function (error) {
        console.error("Error while verifying OTP: ", error);
        Toast.fire({
          icon: 'error',
          title: error
        })
      });
  }
  

function sendotp(){
    if( $$("btns").innerText=="Sign in"){
        verifyOTPAndSignIn()
    } else{
    authenticateWithPhoneNumber()

    }
}