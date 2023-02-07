<script>
  import { createEventDispatcher } from 'svelte';
  
const dispatch = createEventDispatcher();
const displayBlockStatus=()=>{
    dispatch("onAdd",{displayBlock : "addUserButtonClicked"})
}
</script>
<header>
    <div class="mainHeading">
      <div class="headingName">User Management</div>
    </div>
    <div>
      <button
        class="addNewUserButton"
        on:click={displayBlockStatus}
        ><i class="material-icons">&#xE147;</i>Add User</button
      >
    </div>
  </header>
  <style>
      .mainHeading {
    gap: 60px;
  }
  .headingName {
    font-size: 27px;
    font-weight: 600;
    color: white;
  }

    header {
    height: 70px;
    width: 100vw;
    padding: 0 30px;
    background-color: black;
    position: fixed;
    z-index: 100;
    box-shadow: 1px 1px 15px rgba(161, 182, 253, 0.825);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .addNewUserButton {
    width: 110px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 50px 50px;
    background-color: rgb(32, 32, 241);
    cursor: pointer;
  }
  .addNewUserButton:hover {
    background-color: rgb(170, 170, 249);
  }
  </style>