import React, { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import RefreshIcon from '@mui/icons-material/Refresh';

const SearchBar = ({ fetchMovies }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    let value = event.target.value;
    setSearchValue(value);
  };
  

  //when hit search, fetch all movies based on query
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      await fetchMovies(searchValue); // Call the fetchMovies function directly
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleReset=()=>
  {
    window.location.reload();
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <Paper
          component="div"
          sx={{
            p: "4px",
            display: "flex",
            alignItems: "center",
            width: 'auto',
            backgroundColor: "#000",
            border: "2px  #fff solid",
            borderRadius:'6px',
            margin:'20px auto'
          }}
        >
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              color: "white", // Set the color of the input text to white
              "&::placeholder": {
                color: "white", // Set the color of the placeholder text to white
              },
            }}
            placeholder="Search Movies here..."
            inputProps={{ "aria-label": "search google maps" }}
            onChange={handleChange}
          />

          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon sx={{ color: "#fff" }} />
          </IconButton>


          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleReset}
          >
            <RefreshIcon  sx={{ color: "#fff" }} />
          </IconButton>

        </Paper>
      </form>
    </div>
  );
};

export default SearchBar;
