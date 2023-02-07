<script>
  import userStoreData from "./store/userStore";
  import Header from "./Header.svelte";
  import DashBoard from "./DashBoard.svelte";
  import User from "./user.svelte";
  import Form from "./Form.svelte";
  //for rendering html code like form display we used displayBlock variable
  let displayBlock = "default";
  //from postData used to data transfer from parent to child and in api
  const postData = {
    userName: "",
    lastName: "",
    email: "",
    password: "",
    gender: " ",
    dateOfBirth: "",
    location: "",
    address: "",
    displayBlock: "dataPosted",
  };
  //called get api through async and await and data is stored in store namely userStoreData  
  const getData = async () => {
    const res = await fetch(`http://localhost:3000/user`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    userStoreData.set(data);
  };
//when user clicked on addUser button called this function
  const addUserClicked = (e) => {
    displayBlock = e.detail.displayBlock;
  };
  //post api is called on registration form button action 
  const postedData = async (e) => {
    displayBlock = "dataPosted";
    //here we adding new data in store
    $userStoreData = [...$userStoreData, e.detail];
    //post api
    const res = await fetch("http://localhost:3000/user", {
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
        address: postData.address,
      }),
    });
    return (await res).text();
  };
  //delete api called on event handler of user delete button action
  const handleDeleteData = (e) => {
    let id = e.detail;
    //through id we filtered data from store and deleting that
    let filteredData = $userStoreData.filter((res) => res.id !== id);
    $userStoreData = filteredData;
    try {
      fetch("http://localhost:3000/user/" + id, { method: "DELETE" })
        .then((response) => response.text())
        .then((result) => console.log(result));
    } catch (error) {
      console.log(error);
    }
  };
  //update data api called on user update button action
  //userUpdateData variable take data which is updated and passing it to form fields for updating
  let userUpdateData;
  const handleUpdateData = (e) => {
    displayBlock = "updateData";
    userUpdateData = e.detail;
  };
//updated data sending to api and display
  const updateData = (e) => {
    displayBlock = "dataUpdated";
    let id = e.detail.id;
    let updateApiData = e.detail;
    console.log(id);
    console.log($userStoreData);
    let index = $userStoreData.filter((res) => res.id !== id);
    $userStoreData = index;
    console.log($userStoreData);
    fetch(`http://localhost:3000/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: updateApiData.userName,
        lastName: updateApiData.lastName,
        email: updateApiData.email,
        password: updateApiData.password,
        gender: updateApiData.gender,
        dateOfBirth: updateApiData.dateOfBirth,
        location: updateApiData.location,
        address: updateApiData.address,
      }),
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((e) => {
        console.log(e);
      });
  };
</script>

<!-- for header part rendering -->
<Header on:onAdd={addUserClicked} />
<div class="main-container">
  <!-- for dashboard part -->
  <DashBoard />

  <!-- for displaying dashboard witch changing displayBlock status -->
  {#if displayBlock === "default" || displayBlock === "dataUpdated" || displayBlock === "dataPosted"}
    <User
      on:onDelete={handleDeleteData}
      on:onUpdate={handleUpdateData}
      {getData}
    />
  {:else if displayBlock === "addUserButtonClicked" || displayBlock === "updateData"}
    <!-- html form open when button clicked -->
    <Form
      {postData}
      {userUpdateData}
      on:onPost={postedData}
      on:onUpdateData={updateData}
      {displayBlock}
    />
  {/if}
</div>

<style>
  
</style>
