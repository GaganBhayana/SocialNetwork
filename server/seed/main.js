const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const users = require('./user.json').users;
const posts = require('./post.json').posts;
const comments = require('./comment.json').comments;

// User.remove({});
// users.forEach(user => {
//   new User(user)
//     .save()
//     .then(() => {
//       console.log('Saved');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
//
// Post.remove({})
//   .then(() => {
//     console.log('Success');
//   });
// posts.forEach(post => {
//   new Post(post)
//     .save()
//     .then(() => {
//       console.log('Saved');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// comments.forEach(comment => {
//   new Comment(comment)
//     .save()
//     .then(() => {
//       console.log('Saved');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
