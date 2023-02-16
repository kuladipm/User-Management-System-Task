<script>
  import Header from "./Header.svelte";
  import User from "./user.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import FormBootstrap from "./FormBootstrap.svelte";
  //for rendering html code like form display we used displayBlock variable
  let displayBlock = "default";
  //for pagination we send page as number to params an this is reactive
  $: page = 1;
  //total records length stored in all record variable which is came from back end
  let allRecord = "";
  //for showing how many record are displayed in a page out off total records
  let displayRecordPerPage = "";
  //for showing no of pages from all records by using math.ceil formula
  let recordOutOffTotal = "";
  //main array
  let postData = [];
//page variable we bind with page number method so that we handle pagination
  $: pageNumber = (e) => {
    if (e.detail.message === "next" && page < allRecord) {
      page++;
      getData();
    } else if (e.detail.message === "prev" && page > 1 && page <= allRecord) {
      page--;
      getData();
      console.log("prev pressed");
    } else if (e.detail > 0 && e.detail <= allRecord) {
      console.log(e.detail + "pressed");
      page = e.detail;
      getData();
    }
  };
  //called get api through async and await and data is stored in array
  const getData = async () => {
    const res = await fetch(
      `http://localhost:3000/user/data/paginate?page=${page}&limit=7`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    const apiData = await res.json();
    postData = apiData.paginationData;
    allRecord = apiData.totalRecords;
    displayRecordPerPage = postData.length;
    recordOutOffTotal = Math.ceil(allRecord / 7);
  };
  //when user clicked on addUser button called this function
  const addUserClicked = (e) => {
    displayBlock = "addUserButtonClicked";
  };
  const homeRender = () => {
    displayBlock = "homeButtonClicked";
  };
  //post api is called on registration form button action
  const postedData = async (e) => {
    let validateData = e.detail;
    console.log(validateData);
    if (
      e.detail.userName === "" ||
      e.detail.email === "" ||
      e.detail.dateOfBirth === "" ||
      e.detail.password === "" ||
      e.detail.confirmPassword === "" ||
      e.detail.gender === "" ||
      e.detail.address === "" ||
      e.detail.state === "" ||
      e.detail.pin === "" ||
      e.detail.street === "" ||
      e.detail.city === "" ||
      e.detail.landmark === ""
    ) {
      toast.error("please enter all detail", {
        style:
          "border: 1px solid #713200; padding: 16px;width:60%; color: #713200;",
        position: "bottom-center",
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } else {
      displayBlock = "dataPosted";
      const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: e.detail.userName.trim(),
          lastName: e.detail.lastName.trim(),
          email: e.detail.email.trim(),
          password: e.detail.password.trim(),
          gender: e.detail.gender,
          dateOfBirth: e.detail.dateOfBirth,
          address: e.detail.address.trim(),
          street: e.detail.street,
          landmark: e.detail.landmark,
          city: e.detail.city,
          state: e.detail.state,
          pin: e.detail.pin,
        }),
      });
      toast.success("user added successfully", {
        style:
          "border: 1px solid #713200; padding: 16px;width:60%; color: #greeny;",
        position: "bottom-center",
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      });
      return (await res).text();
    }
  };
  //delete api called on event handler of user delete button action
  const handleDeleteData = (e) => {
    let id = e.detail;
    console.log(e.detail);
    //through id we filtered data from store and deleting that
    let filteredData = postData.filter((res) => res.id !== id);
    postData = filteredData;
    try {
      fetch(`http://localhost:3000/user/${id}`, { method: "DELETE" })
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
    if (
      e.detail.userName === "" ||
      e.detail.email === "" ||
      e.detail.dateOfBirth === "" ||
      e.detail.password === "" ||
      e.detail.confirmPassword === "" ||
      e.detail.gender === "" ||
      e.detail.address === "" ||
      e.detail.state === "" ||
      e.detail.pin === "" ||
      e.detail.street === "" ||
      e.detail.city === "" ||
      e.detail.landmark === ""
    ) {
      toast.error("please enter all detail", {
        style:
          "border: 1px solid #713200; padding: 16px;width:60%; color: #713200;",
        position: "bottom-center",
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } else {
      displayBlock = "dataUpdated";
      let id = e.detail.id;
      let updateApiData = e.detail;
      console.log(id);
      fetch(`http://localhost:3000/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: updateApiData.userName.trim(),
          lastName: updateApiData.lastName.trim(),
          email: updateApiData.email.trim(),
          password: updateApiData.password.trim(),
          gender: updateApiData.gender,
          dateOfBirth: updateApiData.dateOfBirth,
          address: updateApiData.address.trim(),
          street: updateApiData.street.trim(),
          landmark: updateApiData.landmark.trim(),
          city: updateApiData.city,
          state: updateApiData.state,
          pin: updateApiData.pin.trim(),
        }),
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((e) => {
          console.log(e);
        });
    }
  };
  
    const searchData =(e) => {
      
    
  };
  
  
</script>

<!-- for header part rendering -->
<Header on:onAdd={addUserClicked} on:onHome={homeRender} on:onSearch={searchData} />
<div class="main-container">
  <Toaster />
  <!-- for displaying dashboard witch changing displayBlock status -->
  {#if displayBlock === "default" || displayBlock === "dataUpdated" || displayBlock === "dataPosted" || displayBlock === "homeButtonClicked"}
    <User
      on:onDelete={handleDeleteData}
      on:onUpdate={handleUpdateData}
      {getData}
      {postData}
      {allRecord}
      {displayRecordPerPage}
      {recordOutOffTotal}
      {page}
      on:page={pageNumber}
      on:prev={pageNumber}
      on:next={pageNumber}
    />
  {:else if displayBlock === "addUserButtonClicked"}
    <FormBootstrap on:onPost={postedData} {displayBlock} />
  {:else if displayBlock === "updateData"}
    <!-- html form open when button clicked -->
    <FormBootstrap
      {userUpdateData}
      on:onUpdateData={updateData}
      {displayBlock}
    />
  {/if}
</div>

<style>
</style>
