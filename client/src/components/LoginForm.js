import { useEffect } from 'react';
import { loginUser } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toggleLoginModalOpen } from '../slices/modalSlice';

const LoginForm = () => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) =>
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(toggleLoginModalOpen());
    }
  }, [dispatch, isAuthenticated]);

  return (
      <form onSubmit={(e) => onSubmit(e)}>
        <input type='email' name='email' value={formData.email}
               onChange={(e) => onChange(e)}/>
        <input type='password' name='password'
               value={formData.password}
               onChange={(e) => onChange(e)}/>
        <input type='submit' value='Login'/>
      </form>
  );
};

export default LoginForm;
