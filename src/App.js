import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home"; // Import Home Component
import Movies from "./components/Pages/movie"; // Import Movies Component
import Action from "./components/Pages/Action";
import Horror from "./components/Pages/Horror";
import Comedy from "./components/Pages/Comedy";
import TopRated from "./components/Pages/TopRated";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import BillboardRow from "./components/billboard-row/BillboardRow";
import TvShows from "./components/Pages/TvShows";
import TVShowDetails from "./components/Pages/TVShowDetails";

function App() {
  return (
    <Router>
       <Navbar/>
      <Routes>
       
        <Route path="/" element={<Home />} />
        
        {/* Route for Movie details, using dynamic route parameter 'movieId' */}
        <Route path="/movie/:movieId" element={<Movies />} />
        <Route path="/action" element={<Action/>} />
        <Route path="/horror" element={<Horror/>} />
        <Route path="/comedy" element={<Comedy/>} />
        <Route path="/top_rated" element={<TopRated/>} />
        <Route path="/tv_shows" element={<TvShows/>} />
        <Route path="/tvshow/:tvShowId" element={<TVShowDetails/>} />





        
        {/* Add other routes if necessary */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
