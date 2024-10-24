import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="navbar bg-blue-400 flex justify-between">
      <div> <Link to={"/"}>
        <a className="btn btn-ghost text-xl">daisyUI</a>
        </Link>
      </div>
      <div>
      <div className="btn btn-ghost ">
        <Link to={"/"}>HOME</Link>
      </div>
      <div className="btn btn-ghost">
        <Link to={"/aboutus"}>ABOUT US</Link>
      </div>
      <div className="btn btn-ghost">
        <Link to={"/carGallery"}>CAR GALLERY</Link>
      </div>
      </div>
      
    </div>)
}

export default Header
