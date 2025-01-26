import { Button, Dropdown, Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const HeaderNav = () => {
  const {user,userlogout}=useAuth()
  const navigate=useNavigate()
    const links=<>
    <li className="mx-2 text-white text-lg"><NavLink to='/'>Home</NavLink></li>
    <li className="mx-2 text-white text-lg"><NavLink to='/alltrainer'>All Traine</NavLink></li>
    <li className="mx-2 text-white text-lg"><NavLink to='/allclasses'>All Classes </NavLink></li>
    <li className="mx-2 text-white text-lg"><NavLink to='/forums'>Forums page</NavLink></li>
    {user?<li className="mx-2 text-white text-lg"><NavLink to='/dashboard'>Dashboard</NavLink></li>:''}
    </>
    const handellogout=()=>{
      console.log('logoust')
      userlogout().then(()=>{
         navigate('/login')
      })
    }
    return (
        <Navbar fluid rounded className="bg-slate-700 top-0 fixed left-0 right-0 z-50">
        <Navbar.Brand >
          <img src="/fitnessLogo.jpg" className="h-[20px] w-[20px] md:h-[50px] md:w-[50px] mx-1 border rounded-full" alt="" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-white italic">Fitness<span className="text-[#26b1c9]">Zone</span></span>
        </Navbar.Brand>
        <div className="flex md:hidden">
        <Dropdown label="Menu">
      <Dropdown.Header>
      {
            user && <div className="flex justify-between gap-2 items-center">
            <li className="text-xl list-none text-white"><img src={user.photoURL} alt="" className="w-[50px] h-[50px] rounded-full" /></li>
            <li className="list-none flex" onClick={handellogout}><Button>Logout</Button></li>
            </div>||<div><Link to='/login'><Button>Login</Button></Link></div>
          }
      </Dropdown.Header>
      <Dropdown.Item><li className="mx-2  text-lg"><NavLink to='/'>Home</NavLink></li></Dropdown.Item>
      <Dropdown.Item><li className="mx-2 text-lg"><NavLink to='/alltrainer'>All Traine</NavLink></li></Dropdown.Item>
      <Dropdown.Item> <li className="mx-2 text-lg"><NavLink to='/allclasses'>All Classes </NavLink></li></Dropdown.Item>
      <Dropdown.Item> <li className="mx-2 text-lg"><NavLink to='/forums'>Forums page</NavLink></li></Dropdown.Item>
      <Dropdown.Item> {user?<li className="mx-2  text-lg"><NavLink to='/dashboard'>Dashboard</NavLink></li>:''}</Dropdown.Item>
      <Dropdown.Divider />
    </Dropdown>
        </div>
 
        <div className="md:flex justify-between md:order-2 hidden ">
          {
            user && <div className="flex justify-between gap-2 items-center">
            <li className="text-xl list-none text-white"><img src={user.photoURL} alt="" className="w-[50px] h-[50px] rounded-full" /></li>
            <li className="list-none flex" onClick={handellogout}><Button>Logout</Button></li>
            </div>||<div><Link to='/login'><Button>Login</Button></Link></div>
          }
        </div>
        <Navbar.Collapse>
          {links}
        </Navbar.Collapse>
      </Navbar>
    );
};

export default HeaderNav;