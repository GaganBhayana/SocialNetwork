import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../actions/postActions';

const initialState = {
  posts: [],
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_BEGIN:
      return {
        ...state,
        loading: true
      };

    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        posts: action.payload.posts
      };
    }

    case FETCH_POSTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    }

    default:
    return state;

  }
}
