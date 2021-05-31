import '../styles/footer.css';

const Footer = props => {
  return (
      <footer>
        <div className='container'>
          <div className='footer'>
            <ul className='footer_links_list'>
              <li><a href='https://google.com'>Privacy</a></li>
              <li><a href='https://google.com'>FAQ</a></li>
              <li><a href='https://google.com'>Contacts</a></li>
              <li><a href='https://google.com'>Feedback</a></li>
            </ul>
          </div>
          <div className='copyright'>Smile Wide © 2021</div>
        </div>
      </footer>
  );
};

export default Footer;
