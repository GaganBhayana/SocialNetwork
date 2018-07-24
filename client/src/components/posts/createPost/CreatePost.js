import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AuthService from '../../../utils/authService';
import stateToProps from '../../../utils/stateToProps/currentUser';
import axios from '../../../utils/axios';
import { Aux } from '../../../hoc/Hoc';
import { Notifications } from '../../Components';

import classes from './CreatePost.css';

class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.Auth = new AuthService();
    this.state = {
      content: '',
      img: '',
      loading: 'false',
      alerts: [],
    }
  }

  handleValidation = () => {
    if (!this.state.content.trim().length && !this.state.img.trim().length) {
      this.setState({
        alerts: [{
          message: "Post can't be empty",
          type: 'error'
        }]
      });
      return  false;
    }
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.handleValidation()) {
      return;
    }

    this.setState({
      loading: true
    });

    axios({
      method: 'post',
      url: '/post',
      data: {
        content: this.state.content,
        img: this.state.img,
        owner: this.props.user._id
      },
      headers: {
        'x-access-token': this.Auth.getToken()
      }
    })
      .then(res => {
        let alerts = [{
          message: 'Post submitted',
          type: 'success'
        }];

        this.setState({
          content: '',
          img: '',
          loading: false,
          alerts: alerts
        });
      })
      .catch(err => {
        console.log(err);
        let alerts = [{
          message: 'Connection error',
          type: 'error'
        }];

        this.setState({
          loading: false,
          alerts: alerts
        });
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleNotifications = (index) => {
    this.setState({
      alerts: []
    });
  }

  render() {

    let ImgStyle = {};
    if (this.state.img.trim().length) {
      ImgStyle.display = 'flex';
    } else {
      ImgStyle.display = 'none';
    }
    return (
      <Aux>
        <Notifications
          items={this.state.alerts}
          collapse={this.handleNotifications}/>
        <div className={classes.CreatePost}>
          <input
            className={classes.Post}
            autoComplete='off'
            placeholder="What's on your mind"
            type='text'
            name='content'
            onChange={this.handleChange}
            value={this.state.content} />
          <div className={classes.ImgFieldDiv}>
            <input
              className={classes.ImgFieldInput}
              autoComplete='off'
              placeholder='Image...'
              type='text'
              name='img'
              onChange={this.handleChange}
              value={this.state.img}/>
            <i className={`material-icons ${classes.ImgFieldIcon}`}>image</i>
          </div>
          <div
            style={ImgStyle}
            className={classes.ImgContainer}>
            <img
              src={this.state.img}
              height='80px'
              width='auto'
              alt='img'/>
          </div>
          <button
            className={classes.PostButton}
            onClick={this.handleSubmit}>
            Post
          </button>
        </div>
      </Aux>
    );
  }
}

export default connect(stateToProps)(withRouter(CreatePost));
