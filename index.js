var users = [
  {
    email: "email@test.com",
    password: "123",
    amount: 10,
  },
];
var isLoggedIn = false;
var loginDiv = document.querySelector(".login-container");
var registerDiv = document.querySelector(".register-container");
var dashboard = document.querySelector(".dashboard");
var witBtn = document.querySelector("#wit");
var depBtn = document.querySelector("#dep");

mainSystem(true, users[0]);

// Login user

loginDiv.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  var form = new FormData(event.target);
  var creds = {
    email: form.get("email"),
    password: form.get("password"),
  };
  var userExists = users.find(function (user) {
    return user.email === creds.email;
  });
  if (userExists) {
    if (userExists.password === creds.password) {
      isLoggedIn = true;
      mainSystem(isLoggedIn, creds);
    } else {
      alert("Invalid password");
    }
  } else {
    alert("Invalid email");
  }
});

// Register user

registerDiv.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  var form = new FormData(event.target);
  var newUser = {
    email: form.get("email"),
    password: form.get("password"),
    amount: 0,
  };
  var userExists = users.find(function (user) {
    return user.email === newUser.email;
  });

  if (!userExists) {
    users.push(newUser);
  } else {
    alert("User already exists");
  }
});

// Switch between Register and Login

var nav = document.querySelector(".nav");
nav.querySelectorAll("button").forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    if (event.target.innerText === "Login") {
      loginDiv.style.display = "block";
      registerDiv.style.display = "none";
    } else if (event.target.innerText === "Register") {
      loginDiv.style.display = "none";
      registerDiv.style.display = "block";
    }
  });
});

// Dahsboard Logic

function mainSystem(isLoggedIn, currentUser) {
  loginDiv.style.display = "none";
  registerDiv.style.display = "none";
  dashboard.style.display = "block";
  witBtn.addEventListener("click", function (event) {
    withdraw(event, currentUser);
  });
  depBtn.addEventListener("click", function (event) {
    deposit(event, currentUser);
  });
}

// Withdrawal logic

function withdraw(event, currentUser) {
  var amount = +document.querySelector("#amount").value;
  if (amount >= 1) {
    if (amount <= currentUser.amount) {
      var index = users.findIndex(function (user) {
        return user.email === currentUser.email;
      });
      users[index].amount = users[index].amount - amount;
      alert("Withdrawal has been made");
    } else {
      alert("Amount is greater than your current balance");
    }
  } else {
    alert("Please enter valid amount");
  }
}

// Deposit logic

function deposit(event, currentUser) {
  var amount = +document.querySelector("#amount").value;
  if (amount >= 1) {
    var index = users.findIndex(function (user) {
      return user.email === currentUser.email;
    });
    users[index].amount = users[index].amount + amount;
    alert("Amount has been deposited");
  } else {
    alert("Please enter valid amount");
  }
}
