import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa";
import {useSelector , useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import { register,reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
const Register = () => {
  const [formData , setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const {name,email,password,password2} = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const  {user,isLoading,isError,isSuccess,message} = useSelector((store) => store.auth)
  
  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
    if(isSuccess || user) {
      navigate('/'); 
    }
    dispatch(reset());
  },[user,isError,isSuccess,message,navigate,dispatch])
  
  const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]:e.target.value
      }))
  }

  

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(password!==password2) {
      toast.error("Password do no match")
    } else {
      const userData = {
        name,email,password
      }
      dispatch(register(userData));
    }

  }


  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>
      <p>Please create an account</p>
    </section>
    <section className="form">
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter you name" onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter you email" onChange={onChange} />
        </div>
        <div className="form-group">  
          <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter you password" onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirm Password" onChange={onChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Register