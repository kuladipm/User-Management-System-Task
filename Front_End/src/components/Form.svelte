<script>
  // import userStoreData from "./store/userStore"
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let postData;
  export let userUpdateData;
  export let displayBlock;
  if (displayBlock === "updateData") {
    postData = userUpdateData;
    console.log(postData);
  } else {
    postData;
    console.log(postData);
  }
  // console.log(postData.userName)
  let renderUserName;

  const formHandler = (event) => {
    event.preventDefault();
    console.log(postData);
    if (displayBlock === "updateData") {
      dispatch("onUpdateData", postData);
    } else {
      dispatch("onPost", postData);
    }
    // $userStoreData = [...$userStoreData,{ userName: postData.userName,
    //   lastName: postData.lastName,
    //   email: postData.email,
    //   password: postData.password,
    //   gender: postData.gender,
    //   dateOfBirth: postData.dateOfBirth,
    //   location: postData.location,
    //   address:postData. address}];
  };
</script>

<div class="body">
  <div class="container">
    <div class="title">Registration</div>
    <div class="content">
      <form action="#">
        <div class="user-details">
          <div class="input-box">
            <span class="details">First Name</span>
            <input
              type="text"
              placeholder="Enter your first name"
              id="userName"
              bind:value={postData.userName}
              required
            />
          </div>
          <div class="input-box">
            <span class="details">Last Name</span>
            <input
              type="text"
              placeholder="Enter your last name"
              id="lastName"
              bind:value={postData.lastName}
              required
            />
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input
              type="text"
              placeholder="Enter your email"
              id="email"
              bind:value={postData.email}
              required
            />
          </div>
          <div class="input-box">
            <span class="details">Date Of Birth</span>
            <input
              type="date"
              placeholder="Enter your date of birth"
              id="dateOfBirth"
              bind:value={postData.dateOfBirth}
              required
            />
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              bind:value={postData.password}
              required
            />
          </div>
          <div class="input-box">
            <span class="details">Confirm Password</span>
            <input
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div class="input-box">
            <span class="details">Location</span>
            <input
              type="text"
              placeholder="Enter your location"
              id="location"
              bind:value={postData.location}
              required
            />
          </div>
          <div class="input-box">
            <span class="details">Address</span>
            <input
              type="text"
              placeholder="Enter your address"
              id="address"
              bind:value={postData.address}
              required
            />
          </div>
        </div>
        <div class="gender-details">
          <input
            type="radio"
            name="gender"
            id="dot-1"
            value="male"
            bind:group={postData.gender}
          />
          <input
            type="radio"
            name="gender"
            id="dot-2"
            value="female"
            bind:group={postData.gender}
          />
          <input
            type="radio"
            name="gender"
            id="dot-3"
            value="other"
            bind:group={postData.gender}
          />
          <span class="gender-title">Gender</span>
          <div class="category">
            <label for="dot-1">
              <span class="dot one" />
              <span class="gender">Male</span>
            </label>
            <label for="dot-2">
              <span class="dot two" />
              <span class="gender">Female</span>
            </label>
            <label for="dot-3">
              <span class="dot three" />
              <span class="gender">other</span>
            </label>
          </div>
        </div>
        <div class="button">
          <button class="register" on:click={formHandler}>Register</button>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  .body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-left: 10%;
    margin-top: 5%;
    margin-bottom: 5%;
  }
  .container {
    max-width: 700px;
    width: 100%;
    background-color: #fff;
    padding: 25px 30px;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }
  .container .title {
    font-size: 25px;
    font-weight: 500;
    position: relative;
    text-align: center;
  }
  /* .container .title::before{
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 30px;
  border-radius: 5px;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
} */
  .content form .user-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0 12px 0;
  }
  form .user-details .input-box {
    margin-bottom: 15px;
    width: calc(100% / 2 - 20px);
  }
  form .input-box span.details {
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
  }
  .user-details .input-box input {
    height: 45px;
    width: 100%;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1px solid #ccc;
    border-bottom-width: 2px;
    transition: all 0.3s ease;
  }
  .user-details .input-box input:focus,
  .user-details .input-box input:valid {
    border-color: #9b59b6;
  }
  form .gender-details .gender-title {
    font-size: 20px;
    font-weight: 500;
  }
  form .category {
    display: flex;
    width: 80%;
    margin: 14px 0;
    justify-content: space-between;
  }
  form .category label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  form .category label .dot {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    margin-right: 10px;
    background: #d9d9d9;
    border: 5px solid transparent;
    transition: all 0.3s ease;
  }
  #dot-1:checked ~ .category label .one,
  #dot-2:checked ~ .category label .two,
  #dot-3:checked ~ .category label .three {
    background: #9b59b6;
    border-color: #d9d9d9;
  }
  form input[type="radio"] {
    display: none;
  }
  form .button {
    height: 45px;
    margin: 35px 0;
  }
  .register {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);
  }
  form .button input:hover {
    /* transform: scale(0.99); */
    background: linear-gradient(-135deg, #71b7e6, #9b59b6);
  }
  @media (max-width: 584px) {
    .container {
      max-width: 100%;
    }
    form .user-details .input-box {
      margin-bottom: 15px;
      width: 100%;
    }
    form .category {
      width: 100%;
    }
    .content form .user-details {
      max-height: 300px;
      overflow-y: scroll;
    }
    .user-details::-webkit-scrollbar {
      width: 5px;
    }
  }
  @media (max-width: 459px) {
    .container .content .category {
      flex-direction: column;
    }
  }
</style>
