import React, { useState, useEffect } from 'react';

const Post = ({ post }) => {
  console.log();
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
          <p className="gag_likes">Likes: {post.likes.length}</p>
        </div>
      </article>
  );
};

export default Post;
