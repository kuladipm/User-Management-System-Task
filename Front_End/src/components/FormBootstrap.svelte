<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let postData;
  export let userUpdateData;
  export let displayBlock;
  //for empty form field
  let blankField = {
    userName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: " ",
    dateOfBirth: "",
    address: "",
    street:"",
    landmark:"",
    city:"",
    state: "",
    pin: "",
  };
  //for updating we assign update data object to main object
  if (displayBlock === "updateData") {
    postData = userUpdateData={
      id:userUpdateData.id,
      userName: userUpdateData.userName,
        lastName: userUpdateData.lastName,
        email: userUpdateData.email,
        password: userUpdateData.password,
        confirmPassword: userUpdateData.password,
        gender: userUpdateData.gender,
        dateOfBirth: userUpdateData.dateOfBirth,
        address:userUpdateData.address,
          street:userUpdateData.street,
          landmark:userUpdateData.landmark,
          city:userUpdateData.city,
          state:userUpdateData.state,
          pin:userUpdateData.pin,
    }
    console.log(postData);
  } else {
    postData = blankField;
    console.log(postData);
  }
  //showing error below input field
  let valid = false;
  let errors = {
    userName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: " ",
    dateOfBirth: "",
    address: "",
    street:"",
    landmark:"",
    city:"",
    state: "",
    pin: "",
  };

  const validateEmail = (email) => {
    console.log(email);
    var emailRegEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };
  const correctName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };
  const correctPin = (pin) => {
    return /^\d+$/.test(pin);
  };

  const formHandler = (event) => {
    //first name
    valid = true;
    if (
      !correctName(postData.userName) ||
      postData.userName.length < 1
    ) {
      valid = false;
      errors.userName = "please enter valid first name";
    } else {
      errors.userName = "";
    }
    //last name
    if (
      !correctName(postData.lastName) ||
      postData.lastName.length < 1
    ) {
      valid = false;
      errors.lastName = "please enter valid last name";
    } else {
      errors.lastName = "";
    }
    //email
    if (!validateEmail(postData.email) || postData.email.length < 1) {
      valid = false;
      errors.email = "email should be in proper format";
    } else {
      errors.email = "";
    }
    //date of birth
    if (postData.dateOfBirth === "") {
      valid = false;
      errors.dateOfBirth = "please select date of birth";
    } else {
      errors.dateOfBirth = "";
    }
    //password validation
    if (!validatePassword(postData.password)) {
      valid = false;
      errors.password =
        "password must be min 8 character & have upper,lower letter & special char & number";
    } else {
      errors.password = "";
    }
    //confirm password validation
    if (postData.password !== postData.confirmPassword) {
      valid = false;
      errors.confirmPassword = "password and confirm password are not match";
    } else {
      errors.confirmPassword = "";
    }
    //address
    if (postData.address.length < 1) {
      valid = false;
      errors.address = "please enter address";
    } else {
      errors.address = "";
    }
     //street
     if (postData.street.length < 1) {
      valid = false;
      errors.street = "please enter street";
    } else {
      errors.street = "";
    }
    //landmark
    if (postData.landmark === "") {
      valid = false;
      errors.landmark = "please enter landmark";
    } else {
      errors.landmark = "";
    }
    //city
    if (postData.city.length < 1) {
      valid = false;
      errors.city = "please select city";
    } else {
      errors.city = "";
    }
    //state
    if (postData.state === "") {
      valid = false;
      errors.state = "please select state";
    } else {
      errors.state = "";
    }
    //pin
    if (!correctPin(postData.pin)&&postData.pin.length !== 6) {
      valid = false;
      errors.pin = "enter 6 digit pin";
    } else {
      errors.pin = "";
    }
    //gender
    let genders = document.getElementsByName("inlineRadioOptions");
    if (genders[0].checked == ""&&genders[1].checked == "" && genders[2].checked == "") {
      valid = false;
      errors.gender = "please select gender";
    } else {
      errors.gender = "";
    }
    
    //event dispatcher dispatch update and post data
    if (valid) {
      event.preventDefault();
      console.log(postData);
      dispatch("onUpdateData", postData);
      dispatch("onPost", postData);
    } else {
      console.log("invalid input");
    }
  };
</script>

<div class="container col-10">
  <form id="userForm">
    <div class="form-row justify-content-center">
      <div class="form-group m-4 ">
        <h2 for="title">Registration</h2>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6 font-weight-bold">
        <label for="firstName">First Name<span
          style="color:red;font-size: 20px;">*</span
        >:</label>
        <input
          type="text"
          class="form-control"
          id="userName"
          placeholder="Enter Your First Name"
          title="First Name"
          bind:value={postData.userName}
          on:blur={formHandler}
        />
        <div class="error">{errors.userName}</div>
      </div>
      <div class="form-group col-md-6 font-weight-bold">
        <label for="lastName">Last Name<span
          style="color:red;font-size: 20px;">*</span
        >:</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          placeholder="Enter Your Last Name"
          title="Last Name"
          bind:value={postData.lastName}
          on:blur={formHandler}
        />
        <div class="error">{errors.lastName}</div>
      </div>
    </div>
    <div class="form-row ">
      <div class="form-group col-md-6 font-weight-bold font-">
        <label for="email">Email<span style="color:red;font-size: 20px;"
          >*</span
        >:</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter Email"
          title="Email"
          bind:value={postData.email}
          on:blur={formHandler}
        />
        <div class="error">{errors.email}</div>
      </div>
      <div class="form-group col-md-6 font-weight-bold">
        <label for="dateOfBirth">Date Of Birth<span
          style="color:red;font-size: 20px;">*</span
        >:</label>
        <input
          type="text"
          class="form-control"
          id="dateOfBirth"
          placeholder="Select Date Of Birth"
          title="Date Of Birth"
          min="1990-01-01"
          max="2005-12-31"
          onfocus="(this.type='date')"
          bind:value={postData.dateOfBirth}
          on:blur={formHandler}
        />
        <div class="error">{errors.dateOfBirth}</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6 ">
        <div class="form-check form-check-inline">
          <label class="form-check-label font-weight-bold" for="gender"
            >Gender<span style="color:red;font-size: 20px;">*&nbsp;</span>:&nbsp;&nbsp;</label
            >
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="male"
            value="male"
            bind:group={postData.gender}
          on:blur={formHandler}
            
          />
          <label class="form-check-label" for="male">Male:</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="female"
            value="female"
            bind:group={postData.gender}
          on:blur={formHandler}

          />
          <label class="form-check-label" for="female">Female:</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="other"
            value="other"
            bind:group={postData.gender}
          on:blur={formHandler}

          />
          <label class="form-check-label" for="other">Other</label>
        </div>
        <div class="error">{errors.gender}</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6 font-weight-bold">
        <label for="password">Password<span
          style="color:red;font-size: 20px;">*</span
        >:</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          title="Password"
          bind:value={postData.password}
          on:blur={formHandler}
        />
        <div class="error">{errors.password}</div>
      </div>
      <div class="form-group col-md-6 font-weight-bold">
        <label for="confirm Password">Confirm Password<span
          style="color:red;font-size: 20px;">*</span
        >:</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          placeholder="Confirm Password"
          title="Confirm Password"
          bind:value={postData.confirmPassword}
          on:blur={formHandler}
        />
        <div class="error">{errors.confirmPassword}</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-4 font-weight-bold">
        <label for="inputAddress"
          >Building/Apartment<span style="color:red;font-size: 20px;">*</span
          >:</label
        >
        <input
          type="text"
          class="form-control"
          id="bulding"
          placeholder="Building/Apartment"
          title="Building/Apartment"
          bind:value={postData.address}
          on:blur={formHandler}

        />
        <div class="error">{errors.address}</div>
      </div>
      <div class="form-group col-md-4 font-weight-bold">
        <label for="street">Street Name or Locality<span
          style="color:red;font-size: 20px;">*</span
        >:</label>
        <input
          type="text"
          class="form-control"
          id="street"
          placeholder="Street Name Or Locality"
          title="Street"
          bind:value={postData.street}
          on:blur={formHandler}

        />
        <div class="error">{errors.street}</div>
      </div>
      <div class="form-group col-md-4 font-weight-bold">
        <label for="landmark">Landmark<span
          style="color:red;font-size: 20px;">*</span
        >:</label>
        <input
          type="text"
          class="form-control"
          id="landmark"
          placeholder="Landmark"
          title="Landmark"
          bind:value={postData.landmark}
          on:blur={formHandler}

        />
        <div class="error">{errors.landmark}</div>
      </div>
      <div class="form-group col-md-4 font-weight-bold">
        <label for="city">City<span style="color:red;font-size: 20px;"
          >*</span
        >:</label>
       <input 
       type="text"
          class="form-control"
          id="City"
          placeholder="Enter City"
          title="City"
          bind:value={postData.city}
          />
        <div class="error">{errors.city}</div>
      </div>
      <div class="form-group col-md-4 font-weight-bold">
        <label for="state">State<span style="color:red;font-size: 20px;"
          >*</span
        >:</label>
        <input
          type="text"
          class="form-control"
          id="state"
          placeholder="Enter State"
          title="State"
          bind:value={postData.state}
          on:blur={formHandler}
          />
        <div class="error">{errors.state}</div>
      </div>

      <div class="form-group col-md-4 font-weight-bold">
        <label for="pin">PIN<span style="color:red;font-size: 20px;"
          >*</span
        >:</label>
        <input
          type="text"
          class="form-control"
          id="pin"
          placeholder="Enter PIN"
          title="Pin"
          bind:value={postData.pin}
          on:blur={formHandler}
        />
        <div class="error">{errors.pin}</div>
      </div>
    </div>
   
    <div class="col text-center">
      <button
        type="submit"
        class="btn btn-primary "
        on:click|preventDefault={formHandler}>Submit</button
      >
    </div>
  </form>
</div>

<style>
  .error {
    font-weight: bold;
    font-size: 12px;
    color: red;
  }
  .form-group,.btn-primary {
    font-family: "Varela Round", sans-serif;
    color: #566787;
  }
  .btn-primary {
    font-family: "Varela Round", sans-serif;
    color: aliceblue;
  }
  
</style>
