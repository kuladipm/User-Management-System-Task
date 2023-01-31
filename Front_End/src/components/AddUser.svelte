<script>
  const postData = {
    userName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    location: "",
    address: "",
  };

  function formHandler(event) {
    event.preventDefault();
    fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: postData.userName,
        lastName: postData.lastName,
        email: postData.email,
        password: postData.password,
        gender: postData.gender,
        dateOfBirth: postData.dateOfBirth,
        location: postData.location,
        address:postData. address,
      }),
      
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch(e =>{
        console.log(e)
      });
  }
</script>

<section>
  <form>
    <div>
      <label for="userId">First Name</label>
      <input type="text" id="userName" bind:value={postData.userName} />
    </div>
    <div>
      <label for="title">Last Name </label>
      <input type="text" id="lastName" bind:value={postData.lastName} />
    </div>
    <div>
      <label for="title">Email </label>
      <input type="text" id="email" bind:value={postData.email} />
    </div>
    <div>
      <label for="title">password </label>
      <input type="text" id="password" bind:value={postData.password} />
    </div>
    <div>
      <label for="title">Gender</label>
      <input type="text" id="gender" bind:value={postData.gender} />
    </div>
    <div>
      <label for="title">date oF Birth </label>
      <input type="date" id="dateOfBirth" bind:value={postData.dateOfBirth} />
    </div>
    <div>
      <label for="title">Location </label>
      <input type="text" id="location" bind:value={postData.location} />
    </div>
    <div>
      <label for="body">Address: </label>
      <textarea id="address" rows="6" cols="22" bind:value={postData.address} />
    </div>
    <button on:click={formHandler}>Create Post</button>
  </form>
</section>

<style>
  section {
    height: 100vh;
    display: grid;
    justify-items: center;
    padding-top: 40px;
  }
  div {
    margin: 24px auto;
  }
  label {
    font-weight: bolder;
    display: block;
    margin-bottom: 4px;
  }
</style>
