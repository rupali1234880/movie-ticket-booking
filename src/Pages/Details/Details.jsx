import { useState } from 'react';
//import './Dashboard.css';
import { makeStyles } from '@material-ui/core/styles';

import {Grid,Paper} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    grid:{
        
        height:'200',
        width: '2%',
        margin:'0px'
    
      },
      paper: {
        padding: theme.spacing(25),
        margin:'20px',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background:theme.palette.success.light,

       },
}));
const Details = () => {
    const [query,setQuery] = useState("");
    const [genres,setGenres] = useState([]);
    const [movies,setMovies] = useState([]);

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = () => {
       sendDetailsToServer();
    }
    //console.log(query);
    const sendDetailsToServer = () => {
        //alert("bhabani");
        if(query){
        axios.get(`https://wookie.codesubmit.io/movies?q=${query}`,{
            headers: {
              'Authorization': `Bearer Wookie2019`
            }
          }).then((responseData) => {
              setMovies(responseData.data.movies);
              setGenres(responseData.data.movies.map(item => item.genres))
            console.log(responseData.data);})
        //console.log(responseData.data.movies.map((item) => item.genres))})
        }
    }
    const classes = useStyles();
    return(
        <div>
            <div>
                <h6>WOOKIE MOVIES</h6>
                <div className="searchbox">
                <input type="text" onChange={handleChange}></input>
                <button onClick={handleSubmit}>search</button>
                </div>
                <hr></hr>
            </div>
            {movies.length >= 1 ? (<div className="showresults">
                {movies.map((item) => (<ol key={movies.id}>Movie-{item.title} , Type-{item.overview} , ratings-{item.imdb_rating}
                    <img src={item.poster}alt="new" />
                  </ol>))}
            </div>) : (<div></div>)}
            <div className={classes.grid}>
      <Grid container spacing={1}>
      <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        </Grid>
        
        </div>
     
        
        </div>
        
        
    );
    
}
export default Details;