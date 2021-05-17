import React, { useEffect } from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../slices/postSlice';

const Body = () => {

  const dispatch = useDispatch();
  const post = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
      <div className="container">
        <div className="content_holder">
          <main class="main_flow">
            {post.status === 'idle' && Object.keys(post.posts)
                .map(postKey => <Post key={post.posts[postKey]._id}
                                      post={post.posts[postKey]}/>)}
          </main>
          <aside className="side_bar">
            <p>Lorem</p>
            <p>Lorem</p>
            <p>Lorem</p>
            <p>Lorem</p>
          </aside>
        </div>
      </div>
  );
};

Body.propTypes = {};

export default Body;
