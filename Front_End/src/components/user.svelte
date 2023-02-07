<script>
  import userStoreData from "./store/userStore";
  import { onMount } from "svelte";
  export let getData;
  onMount(() => {
    getData();
  });
  
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const updateData = (data) => {
    dispatch("onUpdate", data);
  };
  const DeleteData = (data) => {
    dispatch("onDelete", data.id);
  };
 
</script>

<div class="main">
  <div class="report-container">
    <div class="report-header">
      <h1 class="users">Users</h1>
    </div>

    <div class="report-body">
      <table class="table table-striped table-hover">
        <thead class="align">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Date Of Birth</th>
            <th>Location</th>
            <th>Address</th>
            <th class="tableAction">Action</th>
          </tr>
        </thead><tbody>
          {#each $userStoreData as item}
            <tr>
              <td>{item.userName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.location}</td>
              <td>{item.address}</td>
              <td>
                <button class="editButton" on:click={updateData(item)}
                  >edit</button
                ><button class="deleteButton" on:click={DeleteData(item)}
                >delete</button
              ></td
              >
            </tr>
          {:else}
            <h2>Loading...</h2>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .main {
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .report-container {
    min-height: 300px;
    max-width: 1200px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgb(188, 188, 188);
    padding: 0px 20px 20px 20px;
  }
  .report-header {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 10px 20px;
    border-bottom: 2px solid rgba(0, 20, 151, 0.59);
  }

  .users {
    font-size: 30px;
    font-weight: 600;
    color: #5500cb;
    margin-left: 40%;
  }

  .report-body {
    max-width: 1160px;
    overflow-x: auto;
    padding: 20px;
  }
  .editButton {
    margin-right: 20px;
   margin-bottom: 1px;
    width: 65px;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 15px;
    font-weight: 100;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: rgb(46, 131, 46);
  }
  .deleteButton {
    width: 65px;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 15px;
    font-weight: 100;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #e83609, #f13709);
  }
</style>
