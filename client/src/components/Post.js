import { useState, useEffect } from 'react';
import '../styles/post.css';
import { likePost } from '../slices/postSlice';
import {useDispatch} from 'react-redux';
import {
  FaRegComment,
  FaComment,
  FaRegThumbsUp,
  FaThumbsUp,
} from 'react-icons/fa';

const Post = ({ post }) => {
  const [likeHover, setLikeHover] = useState(false);
  const [commentHover, setCommentHover] = useState(false);

  const dispatch = useDispatch();

  return (
      <article className="one_gag">
        <header className="gag_header">
          <p className="gag_section_name">Funny</p>
          <h3 className="gag_title">{post.title}</h3>
        </header>
        <div className="gag_body">
          <div className="gag_container">
            <img
                src={post.url}
                alt={post.title} className="gag_itself"/>
          </div>
        </div>
        <div className="gag_footer">
          <p className="gag_footer_block likes"
             onClick={() => dispatch(likePost({ postId: post._id }))}
             onMouseEnter={() => setLikeHover(true)}
             onMouseLeave={() => setLikeHover(false)}
          >
            {likeHover
                ? <FaThumbsUp size="1.3em"/>
                : <FaRegThumbsUp size="1.3em"/>}&nbsp;{post.likes.length}
          </p>
          <p className="gag_footer_block comments"
             onMouseEnter={() => setCommentHover(true)}
             onMouseLeave={() => setCommentHover(false)}
          >
            {commentHover
                ? <FaComment size="1.3em"/>
                : <FaRegComment size="1.3em"/>}&nbsp;{post.commentsCount}
          </p>
        </div>
      </article>
  );
};

export default Post;
