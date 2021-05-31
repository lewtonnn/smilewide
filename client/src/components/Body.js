import { useEffect } from 'react';
import '../styles/body.css';
import Post from './Post';
import Aside from './Aside';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../slices/postSlice';

const Body = () => {

  const dispatch = useDispatch();
  const post = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
      <div className='container'>
        <div className='content_holder'>
          <main className='main_flow'>
            {post.status === 'idle' && Object.keys(post.posts)
                .map(postKey => <Post key={post.posts[postKey]._id}
                                      post={post.posts[postKey]}/>)}
          </main>
          <Aside />
        </div>
      </div>
  );
};

Body.propTypes = {};

export default Body;
