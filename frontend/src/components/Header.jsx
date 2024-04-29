import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/')
    }
    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Goal Setter</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogout}> <FaSignOutAlt /> Logout</button>
                    </li>
                ) : (
                <>
                    <li>
                        <Link to='/login'> <FaSignInAlt /> Login</Link>
                    </li>
                    <li>
                        <Link to='/register'> <FaUser /> Register</Link>
                    </li>
                </>)}

            </ul>

        </header>
    )
}

export default Header