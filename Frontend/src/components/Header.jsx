import BurgerButton from "./BurgerButton.jsx"
import DotButton from "./DotButton.jsx"
function Header() {
  return (
    <div className="navbar flex justify-between bg-info-content glass py-4 px-11">
      <BurgerButton></BurgerButton>
      <a className="btn btn-ghost text-xl">WheelzNow</a>
      <div className="flex">
     <DotButton/>
      </div>
    </div>
  )
}

export default Header
