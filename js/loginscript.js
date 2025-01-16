document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Hardcoded username and password
    const correctUsername = "admin";
    const correctPassword = "12345";
  
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
  
    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
      // Redirect to another page on successful login
      window.location.href = "dashboard.html"; // Change the URL as per your requirements
    } else {
      // Display error message if credentials are incorrect
      document.getElementById("login-error").style.display = "block";
    }
  });