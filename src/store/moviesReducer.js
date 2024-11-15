// moviesReducer.js

const initialState = {
    movieCategory: {
      movieCollection: [], // Initially, the movie collection is an empty array
    },
  };
  
  const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_MOVIES":
        return {
          ...state,
          movieCategory: {
            ...state.movieCategory,
            movieCollection: action.payload.movies, // Updates movieCollection with payload
          },
        };
      default:
        return state;
    }
  };
  
  export default moviesReducer;
  