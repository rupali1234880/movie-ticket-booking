import { useState,useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Details from '../Details/Details';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import {Grid,Paper} from '@material-ui/core';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,

  DialogTitle,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    grid:{
        width: '100%',
        margin:'0px'
    
      },
      paper: {
        padding: theme.spacing(6),
        margin:'30px',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background:theme.palette.success.light,

       },
}));

const Dashboard = () => {
    const history = useHistory();
    const [query, setQuery] = useState("");
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [showDialog ,setshowDialog]= useState(false)
    const[MovieDetails,setMoviesDetail] = useState({})
    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = () => {
        sendDetailsToServer();
    }

    useEffect(() => {
      console.log("useEffect called")
      sendDetailsToServer();
    }, []);
    //console.log(query);
    const sendDetailsToServer = () => {
        //alert("bhabani");
        // if (query) {
            axios.get("https://wookie.codesubmit.io/movies", {
                headers: {
                    'Authorization': `Bearer Wookie2019`
                }
            }).then((responseData) => {
              console.log("responseData",responseData)
                setMovies(responseData.data.movies);
                setGenres(responseData.data.movies.map(item => item.genres))
                console.log(responseData.data);
            })
            //console.log(responseData.data.movies.map((item) => item.genres))})
        // }
    }
    //console.log(genres)
    const movieDetail = (item) => {
      setshowDialog(true)
      setMoviesDetail(item)
    }

    let  movieList =movies.map((item) => {
      return <div className="card" key ={item}>
   <div className="card-image" onClick={()=>movieDetail(item)}>
     <img src={item.poster} alt='chinut' />
     <span className="card-title">{item.title}</span>
   </div>
 </div>

      
    })
   const closeDialog = () => {
      setshowDialog(false)
    };
const classes = useStyles();
console.log("movies",movies)
    return (
        <div>
            <div>
                <h1>WOOKIE<br></br> MOVIES</h1>
                <div className="searchbox">
                    <input type="text" onChange={handleChange}></input>
                     <button onClick={handleSubmit}>Search</button> 
                    
                    
                </div>
                <hr></hr>
            </div>
           <div>
           <div className="box">{movieList}</div> 

           </div>
           <Dialog
                open={showDialog}
                onClose={closeDialog}
                maxWidth="sm"
                fullWidth
              >
               
                  <DialogContent >
                  <div className="col-sm-12">
                    <div className="col-sm-4">
    
                    <img src={MovieDetails.poster} alt='chinut' />
                    </div>
                    <div className="col-sm-8"  >
    <h3>{MovieDetails.title}</h3>
         <p>{MovieDetails.overview}</p>
    </div>
    </div>
                  </DialogContent>
            
                <DialogActions>
              

                     

                      <Button
                        onClick={() => closeDialog()
                        }
                        color="primary"
                        style={{ marginRight: "5px" }}
                      >
                        Close
                      </Button>
                </DialogActions>
              </Dialog>

  </div>

    );
}
export default Dashboard;
