<script>
  // import userStoreData from "./store/userStore";
  import { onMount } from "svelte";
  import { Confirm } from "svelte-confirm";
  export let getData;
  export let postData;
  export let allRecord;
  export let recordOutOffTotal;
  export let displayRecordPerPage;
  export let page;
  const handlePrev = () => {
    dispatch("prev", { message: "prev" });
  };
  const handleNext = () => {
    if (displayRecordPerPage === 7) {
      dispatch("next", { message: "next" });
    } else {
      console.log("no next record");
    }
  };
  const handlePage = (page) => {
    dispatch("page", page);
  };

  onMount(() => {
    getData();
  });

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const updateData = (data) => {
    dispatch("onUpdate", data);
  };
  const DeleteData = (data) => {
    console.log(data);
    dispatch("onDelete", data);
  };
</script>

<div class="main">
  <div class="report-container">
    <!-- <div class="report-header">
      <h1 class="users">Users</h1>
    </div> -->
    <div class="report-body">
      <table class="table table-striped table-hover">
        <thead class="align">
          <tr>
            <th>User Name</th>
            <!-- <th>Last Name</th> -->
            <th>Email</th>
            <th>Gender</th>
            <th>Date Of Birth</th>
            <th>Address</th>
            <th class="tableAction">Action</th>
          </tr>
        </thead><tbody>
          {#each postData as item}
            <tr>
              <td>{item.userName} {item.lastName}</td>
              <!-- <td>{item.lastName}</td> -->
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.dateOfBirth}</td>
              <td
                >{item.address}
                {item.street}
                {item.landmark}
                {item.city}
                {item.state}
                {item.pin}</td
              >
              <td>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <element
                  on:click={updateData(item)}
                  class="material-symbols-outlined"
                  style="color: cornflowerblue;width: 20px;margin-right: 20px;cursor: pointer;"
                  title="Edit">Settings</element
                >
                <Confirm
                  let:confirm={confirmThis}
                  confirmTitle="Delete"
                  cancelTitle="Cancel"
                  themeColor="250"
                >
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <element on:click={() => confirmThis(DeleteData, item.id)}>
                    <i
                      class="material-icons"
                      title="delete"
                      style="color:red;cursor: pointer">cancel</i
                    >
                  </element>
                  <span slot="title"> Delete this item? </span>
                  <span slot="description">
                    You won't be able to revert this!
                  </span>
                </Confirm>
              </td>
            </tr>
          {:else}
            <h2>Loading...</h2>
          {/each}
        </tbody>
      </table>
      <div class="clearfix">
        <div class="hint-text">
          Showing <b>{(page - 1) * 7 + 1}</b> to
          <b>{(page - 1) * 7 + displayRecordPerPage}</b> entries out of
          <b>{allRecord}</b>
        </div>
        <ul class="pagination">
          <li class="page-item ">
            <a
              href="#"
              class={1 === page ? "invisible" : "page-link"}
              on:click={() => {
                handlePrev();
              }}>Previous</a
            >
          </li>
          {#each Array(recordOutOffTotal) as pbs, i}
            <li class={page === i ? "page-item active" : "page-item"}>
              <a
                href="#"
                on:click={() => {
                  handlePage(i);
                }}
                class="page-link">{i++ +1}</a
              >
            </li>
          {/each}
          <li class="page-item">
            <a
              href="#"
              class={allRecord === page ? "invisible" : "page-link"}
              on:click={() => {
                handleNext();
              }}>Next</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .pagination {
    float: right;
    margin: 0 0 5px;
  }
  .pagination li a {
    border: none;
    font-size: 13px;
    min-width: 30px;
    min-height: 30px;
    color: #999;
    margin: 0 2px;
    line-height: 30px;
    border-radius: 2px !important;
    text-align: center;
    padding: 0 6px;
  }
  .pagination li a:hover {
    color: #666;
  }
  .pagination li.active a,
  .pagination li.active a.page-link {
    background: #03a9f4;
  }
  .pagination li.active a:hover {
    background: #0397d6;
  }
  /* .pagination li.disabled i {
    color: #ccc;
  } */
  .pagination li i {
    font-size: 16px;
    padding-top: 6px;
  }
  .hint-text {
    float: left;
    margin-top: 10px;
    margin-left: 5px;
    font-size: 13px;
  }
</style>
