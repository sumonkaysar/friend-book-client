import { Link, Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import { FaBars } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  const {user, logout} = useContext(AuthContext);

  const handleLogout = () => {
    logout().then(result => console.log(result)).catch(err => console.error(err))
  }

  const menuItems = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/media'>Media</Link></li>
    {
      user?.uid && <li><Link to='/message'>Message</Link></li>
    }
    <li><Link to='/about'>About</Link></li>
    {
      user?.uid ? 
      <li><button onClick={handleLogout} className="btn btn-accent rounded-lg text-white w-fit">Log Out</button></li>:
      <li><Link to='/login'>Log In</Link></li>
    }
  </>

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-300 px-5 fixed z-50">
          <div className="container mx-auto flex-row-reverse lg:flex-row">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="cursor-pointer hover:text-slate-500 transition-colors">
                <FaBars className="text-xl" />
              </label>
            </div>
            <div className="flex-1 mr-2 font-semibold text-lg md:text-2xl cursor-pointer hover:text-slate-500 transition-colors">
              <Link to='/'>FriendBook</Link>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                { menuItems }
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-28 pb-8 px-5">
          <ToastContainer />
          <Outlet />
        </div>
        <Footer />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100">
          { menuItems }
        </ul>
      </div>
    </div>
  );
}

export default Root;
