import BurgerButton from "./BurgerButton.jsx"
import DotButton from "./DotButton.jsx"
function Header() {
  return (
    <div className="navbar flex justify-between bg-info-content glass ">
      <div className="flex ml-10">
        <BurgerButton />
      </div>
      <a className="btn btn-ghost text-xl">WheelzNow</a>
      <div className="flex mr-10">
        <DotButton />
      </div>
    </div>
  )
}

export default Header
