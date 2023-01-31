<script>
  import AddUser from "./AddUser.svelte";
  import DisplayUser from "./DisplayUser.svelte";

    
</script>
<div class="container-xl">
    <div class="table-responsive">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-sm-5">
              <h2>User <b>Management</b></h2>
            </div>
            <div class="col-sm-7">
              <a href="#" class="btn btn-secondary"
                ><i class="material-icons">&#xE147;</i>
                <span>Add New User</span></a
              >
              <AddUser/>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>SR</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Location</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Kuladip</td>
              <td>Magar</td>
              <td>kuldip123@indextechnology.com </td>
              <td>Male</td>
              <td>12/07/1998</td>
              <td>Mumbai</td>
              <td>pawai mumbai maharashtra</td>
              <td>
                <a
                  href="#"
                  class="settings"
                  title="Edit"
                  ><i class="material-icons">edit</i></a
                >
                <a href="#" class="delete" title="Delete" data-toggle="tooltip"
                  ><i class="material-icons">&#xE5C9;</i></a
                >
              </td>
            </tr></tbody
          >
        </table>
        <div class="clearfix">
          <div class="hint-text">Showing <b>1</b> out of <b>25</b> entries</div>
          <ul class="pagination">
            <li class="page-item disabled"><a href="#">Previous</a></li>
            <li class="page-item"><a href="#" class="page-link">1</a></li>
            <li class="page-item"><a href="#" class="page-link">2</a></li>
            <li class="page-item active"><a href="#" class="page-link">3</a></li>
            <li class="page-item"><a href="#" class="page-link">4</a></li>
            <li class="page-item"><a href="#" class="page-link">5</a></li>
            <li class="page-item"><a href="#" class="page-link">Next</a></li>
          </ul>
        </div>
        <DisplayUser/>
      </div>
    </div>
  </div>
 
  