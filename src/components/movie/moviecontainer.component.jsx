import React, { useEffect, useState } from "react";
import axios from "axios";
import "./movie.styles.scss";
import YouTube from "react-youtube";
import Movie from "./movie.component";
import Button from "../button/button.component";
import Typography from "../typography/typography.component";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchBar from "../searchbar/searchbar.component";




const MovieContainer = () => {
  const MOVIE_API = "https://api.themoviedb.org/3/";
  const apiKey = "4e44d9029b1270a757cddc766a1bcb63";
  const SEARCH_API = MOVIE_API + "search/movie";
  const DISCOVER_API = MOVIE_API + "discover/movie";
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playTrailer, setPlayTrailer] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");


  //get movies on page load
  const fetchMovies = async (searchKey) => {
    //get movie genres
    const genreResponse = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );

    const genres = genreResponse.data.genres;
    var url;

    const params = new URLSearchParams({
      api_key: apiKey,
      language: "en-US",
      query: searchKey,
      append_to_response: "genres",
    });

    //if search inputted, then search api is called, if not just use discover_api
    url = `${searchKey ? SEARCH_API : DISCOVER_API}?${params}`;

    try {
      const response = await axios.get(url);

      const {
        data: { results },
      } = response;

      // Map genre IDs to genre names
      const genresMap = {};
      genres.forEach((genre) => {
        genresMap[genre.id] = genre.name;
      });

      // Add genre names to each movie object
      const moviesWithGenres = results.map((movie) => {
        const genreNames = movie.genre_ids.map((id) => genresMap[id]);
        return {
          ...movie,
          genres: genreNames,
        };
      });

      setMovies(moviesWithGenres);
      await selectMovie(moviesWithGenres[0]);
      
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  ///get movie details when selected!
  const fetchMovie = async (id) => {
    let url;

    const params = new URLSearchParams({
      api_key: apiKey,
      language: "en-US",
      append_to_response: "videos",
    });

    url = `https://api.themoviedb.org/3/movie/${id}?${params}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log("error fetching movie data", error);
      return null;
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      const genres = response.data.genres;
      return genres;
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  };

  const fetchMoviesWithGenres = async (searchKey) => {
    const genres = await fetchGenres();
    const movies = await fetchMovies(searchKey);
    const moviesWithGenres = movies.map((movie) => {
      const genreNames = movie.genre_ids.map((genreId) => {
        const genre = genres.find((g) => g.id === genreId);
        return genre ? genre.name : "";
      });
      return { ...movie, genreNames };
    });
    setMovies(moviesWithGenres);
  };

  //render the trailer view video
  const renderTrailer = () => {
    if (movie && movie.videos && movie.videos.results.length > 0 && playTrailer) {
      // console.log(movie)
      const trailer = movie.videos.results.find(
        (vid) => vid.type === "Trailer"
      );

      const clip = movie.videos.results.find((vid) => vid.type === "Clip");

      if (trailer) {
        return (
          <div className="youtube-container">
            <YouTube
              videoId={trailer.key}
              opts={{
                width: "100%",
                height: "auto",
                playerVars: {
                  autoplay: 1,
                  hd: 1,
                  cc_load_policy: 0,
                  fs: 0,
                  iv_load_policy: 0,
                  modestbranding: 0,
                  rel: 0,
                  showinfo: 0,
                },
              }}
            />
          </div>
        );
      } else if (clip) {
        return (
          <div className="youtube-container">
            <YouTube
              videoId={clip.key}
              opts={{
                width: "100%",
                height: "auto",
                playerVars: {
                  autoplay: 1,
                  hd: 1,
                  cc_load_policy: 0,
                  fs: 0,
                  iv_load_policy: 0,
                  modestbranding: 0,
                  rel: 0,
                  showinfo: 0,
                },
              }}
            />
          </div>
        );
      }
    }
    return null;
  };

  //when click movie card, scroll up and display movie data
  const selectMovie = async (movie) => {
    if (movie && movie.id) {
      // console.log(movie)
      setPlayTrailer(false);
      const data = await fetchMovie(movie.id);
      if (data) {
        setMovie(data);
        window.scrollTo(0, 0);
      }
    } else {
    }

  };

  useEffect(() => {
    fetchMovies(searchKey);
    // This function will be called after every render if any of the dependencies change
  }, []);

  return (
    <div>
        <SearchBar fetchMovies={fetchMovies}/>
        { movies.length> 0 && (
        <Card
          sx={{
            backgroundSize: `auto`,
            backgroundColor: "#1C1B1B",
            border: "1px solid white",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >

          <CardContent>
            {renderTrailer()}
        

            {movie &&
              movie.videos &&
              movie.videos.results &&
              movie.videos.results.length != 0 && (
                <Button
                  endIcon={<PlayArrowIcon />}
                  onClick={() => setPlayTrailer(!playTrailer)}
                >
                  {playTrailer ? "Close Trailer" : "Play Trailer"}
                </Button>
              )}

            <Typography>{movie.title}</Typography>
            <Typography variant="body4" align="center" color="text.secondary">
              {movie.overview ? movie.overview: 'No Overview Found'}
            </Typography>
            <Typography variant="body4" align="center" color="text.secondary">
              Release Date : {movie.release_date}
            </Typography>
           
            <Typography variant="body4" align="center" color="text.secondary">
              Genres : {movie.genres ? movie.genres.map(genre=>genre.name).join(' , '): '-'}
            </Typography>
          </CardContent>
        </Card>

              )}
       
        {movies.length > 0 && (
          <Typography variant="h5" align="left">Discover Now</Typography>
        )}
      
        {movies.length === 0 && (
       <Typography variant="h5" align="left">No Movies Found</Typography>
        )}


      <Grid container rowSpacing={4} spacing={3} sx={{ width: "100%" }}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Movie movie={movie} selectMovie={selectMovie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieContainer;
