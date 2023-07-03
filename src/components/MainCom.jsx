import React, { useEffect, useState } from 'react'
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaCircleMinus } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { MdDelete } from "react-icons/md";


const MainCom = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const [imgUrl, setImgUrl] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phone, setPhone] = useState('');
  const [todo, setTodo] = useState('');
  const [searchData, setSearchData] = useState('')

  const [datas, setDatas] = useState(() => {
    const lastTodo = localStorage.getItem('datas')
    return JSON.parse(lastTodo) || []
  })

  useEffect(() => {
    localStorage.setItem('datas', JSON.stringify(datas))
  }, [datas])

  const hideMenuAdd = () => {
    setHideMenu(!hideMenu)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nameInput && phone) {
      setDatas([
        ...datas,
        {
          id: datas.length + 1,
          name: nameInput,
          phoneNum: phone,
          photoUrl: imgUrl ? imgUrl : 'https://contacts-sn.netlify.app/assets/placeholder_user.b5ae7217.png'
        }
        
        
      ]);
      setImgUrl('')
      setNameInput('')
      setPhone('')
      
    }
    else {
      alert('Input is Empty')
    }
    ;
    setTodo('')
    
    
  }

  const handleDelete = (id) => {
    const filteredDatas = datas.filter((data) => data.id != id);
    setDatas(filteredDatas)
  }


  const handleChange = (e) => {
    setTodo(nameInput)
    
  }

  return (
    <div className="container fluid">
      {hideMenu ?
        <div
          className="hero-add_menu d-flex justify-content-center mt-5 mb-5"
          onClick={hideMenuAdd}
        >
          <BsFillPersonPlusFill />Add a Contact {hideMenu}
        </div>
        :
        <div className='d-flex justify-content-center' onClick={hideMenuAdd}>
          <button className=' mt-5 mb-5 minus-icon'>
            <FaCircleMinus
              className='icon'

            />
          </button>
        </div>

      }

      {hideMenu ? "" : <div className='d-flex justify-content-center'>
        <form onSubmit={handleSubmit} className='form-control bg-dark mb-5'>

          <InputGroup className="mb-3">
            <Form.Control aria-label="Text input with checkbox"
              type="url"
              placeholder='Photo Url'
              onChange={(e) => setImgUrl(e.target.value)} />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control aria-label="Text input with checkbox"
              type="text"
              placeholder='Enter Your Name'
              onChange={(e) => setNameInput(e.target.value)} />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control aria-label="Text input with checkbox"
              type="number"
              placeholder='Enter Your Phone Number'
              onChange={(e) => setPhone(e.target.value)} />
          </InputGroup>
          <div className=' d-flex justify-content-end w-100 pe-2'>

            <button className='add-btn '>
              <IoAddCircle className=' add-icon' />
            </button>
          </div>
        </form>
      </div>}
      <section>
        <div className="search_box ">
          <InputGroup className="mb-3">
            <Form.Control aria-label="Text input with checkbox"
              type="search"
              className='rounded bg-body-secondary border-none'
              placeholder='Search'
              onChange={(e) => setSearchData(e.target.value)} />
          </InputGroup>
        </div>
        {datas.length > 0 ? datas.filter((user) => {
          if (searchData === "") {
            return user
          } else if (user.name.toLowerCase().includes(searchData.toLowerCase())) {
            return user
          }
        }).map((user) => (
          <div className="wrapper_data mb-3" key={user.id} >
            <div className="data_user">
              <img src={user.photoUrl} />
              <div className="data_name">
                <p>{user.name}</p>
                <p>{user.phoneNum}</p>
              </div>
            </div>
            <div className="delete_btn-box pe-5">
              <MdDelete
                className='delete-btn'
                onClick={() => handleDelete(user.id)}
              />
            </div>
          </div>

        )) : <div className="no_data text-center">
          <h1>No contacts yet!</h1>
          <p className='opacity-3'>Please add some contacts...</p>
        </div>
        }
        

      </section >
    </div >

  )
}

export default MainCom