import axios from 'axios';

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common = { 'Authorization': `bearer ${token}` };
  }
};

export default setAuthHeader;