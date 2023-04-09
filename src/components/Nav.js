import React, {useEffect, useState} from 'react'
import "./Nav.css" 
import { useNavigate } from 'react-router-dom';
export default function Nav() {
    const [show,setShow]=useState(false);
    const [searchValue, setsearchValue] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
      window.addEventListener("scroll",()=>{
        // console.log('window.scrollY',window.scrollY)
        if(window.scrollY>50){
            setShow(true);
        }else{
            setShow(false);
        }
      })
    
      return () => {
        window.removeEventListener("scroll",()=>{});
      }
    }, [])
    
    const handleChange=(e)=>{
      setsearchValue(e.target.value)
      navigate(`/search?q=${e.target.value}`)

    }
  return (
    <nav className={`nav ${show && "nav__black"}`}>
        <img
            alt="Nexflix logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/330px-Netflix_2015_logo.png"
            className="nav__logo"
            onClick={()=>window.location.reload()}
        />
        <input value={searchValue} onChange={handleChange} className='nav__input' type='text' placeholder='영화를 검색해 주세요'/>
        <img
            alt="User logged"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            className='nav__avatar'
        />
    </nav>
  )
}
