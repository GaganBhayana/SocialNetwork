import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import fetchPosts from '../../../redux/actions/postActions';

import Post from './post/Post';
import classes from './Posts.css'


class Posts extends Component {

  componentDidMount() {
    this.handleFetchPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId !== prevProps.userId) {
      this.handleFetchPosts();
    }
  }

  handleFetchPosts = () => {
    let match = this.props.match;
    let params = {};

    if (match.path === '/user/:id') {
      params.id = match.params.id;
    } else if (match.path === '/group/:id' || match.path === '/page/:id') {
      params.parent = match.prams.id;
    } else if (match.path === '/me') {
      params.id = this.props.userId;
    }

    this.props.dispatch(fetchPosts(params));
  }

  render() {
    console.log(this.props.match);
    const posts = (
      this.props.posts.map((post, index) => <Post key={index} post={post}/>)
    )
    return (
      <div className={classes.PostsContainer}>
        {posts}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.currentUser.user._id,
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error,
});

export default connect(mapStateToProps)(withRouter(Posts));
