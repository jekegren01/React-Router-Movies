import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';
import { Route, Link, Switch } from 'react-router-dom';

import SavedList from './Movies/SavedList';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <div>
        <Switch>
        <Route exact path="/">
          <MovieList movies={movieList} />
        </Route>          
          <Route path="/movies/:id" component={Movie} />
          {/* <Route path */}
        </Switch>
      </div>
    </div>
  );
};

export default App;
