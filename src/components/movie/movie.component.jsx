import React from "react";
import Chip from "@mui/material/Chip";
import "./movie.styles.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from '@mui/material';
import noImage from "../../assets/images/noPoster.jpg";
import Typography from "../typography/typography.component";

const Movie = ({ movie, selectMovie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const renderRatingChip = () => {
    const rating = parseFloat(movie.vote_average).toFixed(2);
    let chipColor;
    if (rating >= 7) {
      chipColor = "success";
    } else if (rating >= 4 && rating < 7) {
      chipColor = "warning";
    } else {
      chipColor = "error";
    }
    return <Chip style={{ fontSize: "16px" }} label={rating} color={chipColor} />;
  };



  return (
    <Card 
      onClick={() => selectMovie(movie)}
      sx={{
        align:'center',
        width: 'auto',
        margin:'auto',
        backgroundColor: "#1C1B1B",
        border: "1px solid white", // Add white border
        borderRadius: "8px", // Optional: Add border radius
      }}
    >
      <CardActionArea>

        {movie.backdrop !='null' ?
          <CardMedia component="img" height="600"  image={`${IMAGE_PATH}/${movie.poster_path}`} alt={movie.title}/>
        : <CardMedia component="img" height="600"  image={`${noImage}`} alt={movie.title}/>
        }

        <CardContent>
          <Typography gutterBottom variant="h5" align="center" noWrap={true} component="div">{movie.title}</Typography>
          <Typography variant="body2" align="center" color="text.secondary" component="div" >Movie Rating : {renderRatingChip()}</Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Movie;
