import './App.css';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import setAuthHeader from './helpers/setAuthHeader';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { loadSelf } from './slices/userSlice';

function App() {

  const dispatch = useDispatch();

  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      setAuthHeader(cookies.token);
      dispatch(loadSelf());
    }
  }, []);

  return (
      <>
        <Header/>
        <Body/>
        <Footer/>
      </>
  );
}

export default App;
