import '../styles/header.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import {
  toggleLoginModalOpen,
  togglePostModalOpen,
} from '../slices/modalSlice';
import LoginForm from './LoginForm';
import PostForm from './postForm';

const Header = () => {

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const myData = useSelector(state => state.user.me);

  const loginModalOpen = useSelector(state => state.modal.loginModalOpen);
  const postModalOpen = useSelector(state => state.modal.postModalOpen);

  return (
      <header>
        <div className="container">
          <nav className="main">
            <ul className="main_nav_list">
              <div className="nav_block left">
                <li className="nav_link">
                  <a href="/">Main</a>
                </li>
                <li className="nav_link">
                  <a href="/sections">Sections</a>
                </li>
              </div>
              <div className="nav_block right">
                <li className="nav_link">
                  {isAuthenticated
                      ? <Link to='/me'><img src={myData.avatar} alt={myData.name}/></Link>
                      : <span onClick={() => dispatch(
                          toggleLoginModalOpen())}>Login</span>
                  }
                  {loginModalOpen &&
                  <Modal childComponent={<LoginForm/>}/>}
                </li>
                <li className="nav_link">
                  <span onClick={() => dispatch(
                      togglePostModalOpen())}>+ Upload</span>
                  {postModalOpen &&
                  <Modal childComponent={<PostForm/>}/>}
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </header>
  );
};

export default Header;
