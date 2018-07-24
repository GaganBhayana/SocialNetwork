import React from 'react';

import classes from './Post.css';

const backgrounds = [
  {
    backgroundImage: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
    color: 'white'
  },
  {
    backgroundImage: 'linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)',
    color: 'white'
  },
  {
    backgroundImage: 'linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)',
    color: 'black'
  },
  {
    backgroundImage: 'linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)',
    color: 'black'
  },
  {
    backgroundImage: 'linear-gradient(to top, #e14fad 0%, #f9d423 100%)',
    color: 'black'
  },
  {
    backgroundImage: 'linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%)',
    color: 'black'
  },
  {
    backgroundImage: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
    color: 'white'
  },
  {
    backgroundImage: 'linear-gradient(to top, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%)',
    color: 'white'
  }
]



const Post = ({post}) => {

  let backgroundStyle = {};

  if (!post.img) {
    backgroundStyle = {...backgrounds[Math.floor(Math.random()*backgrounds.length)]};
    backgroundStyle.minHeight = '200px';
  }

  return (
    <div className={classes.Post}>
      <div className={classes.ImgContainer}>
        {post.img ?
          <img
              alt='img'
              src={post.img}
              className={classes.Img}/> :
          null}
      </div>
      <div
        style={backgroundStyle}
        className={classes.Content}>
        {post.content}
      </div>
    </div>
  );
}

export default Post;
