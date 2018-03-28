const blocPageDiv = document.getElementById("bloc_page")

const render = html => {
  blocPageDiv.innerHTML = html
}

const controllers = {
  "/users/new": () => {
    render(
    <div class="container">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
        )
  }
}
