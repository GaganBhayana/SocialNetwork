import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import classes from './Post.css';
import Menu from './menu/Menu';

//IMG FOR USERS WHO DONT HAVE A PIC
import Avatar from '../../../../assets/img/avatar.jpg';

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
];


const Post = (props) => {
  const post = props.post;

  let backgroundStyle = {};

  if (!post.img) {
    backgroundStyle = {...backgrounds[Math.floor(Math.random()*backgrounds.length)]};
    backgroundStyle.minHeight = '200px';
  }

  return (
    <div className={classes.Post}>
      <div className={classes.Owner}>
        <img
          className={classes.OwnerImg}
          alt='img'
          src={post.ownerImg ? post.ownerImg : Avatar}/>
        <Link to={props.userId === post.owner ? '/me' : `/user/${post.owner}/${post.ownerName.split(' ').join('-')}`}>
          <h1
            data-tip
            onMouseEnter={props.handleMouseEnter}
            onMouseLeave={props.handleMouseLeave}
            className={classes.OwnerName}>{post.ownerName}</h1>
        </Link>
        <ReactTooltip
          place="right"
          type='light'
          className={classes.Info}>
          {props.Info}
        </ReactTooltip>
        {props.showMenu ?
          <Menu
            edit={props.toggleEditModal}
            delete={props.toggleDeleteModal}/> :
          null}
      </div>
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
