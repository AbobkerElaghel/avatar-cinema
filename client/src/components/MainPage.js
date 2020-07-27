import '../App.css';
import React from 'react';
import { Row, Col } from 'reactstrap';
import SlideShow from './Slideshow';
import MovieCard from './MovieCard';
import Movietrailer from './Movietrailer.js';
import Daysbar from '../components/Tabs.js';

class MainPage extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
      moviesforDay : []
    };
  };

  check(date){
    var array = [];
    this.props.movies.map((movie, i)=>{
      const day  =  new Date(movie.playDate).getDate();
      if(day === date ){
        array.push({movie, i})
      }  
    }) 
    this.setState({
      moviesforDay : [...array] 
    },()=>{

    })
  }
 
  
  render(){
    let check = {};
    let trailers = []
    this.state.moviesforDay.forEach((movie, i)=> {
      if(check[movie.movie.Title] == undefined) {
        check[movie.movie.Title] = movie
        trailers.push(<Movietrailer key={movie.i} movie={movie.movie} />)
      }
    });
    return (
      <div style={{backgroundColor: 'rgb(24, 24, 31)'}}>
      <SlideShow/>
      <Row>
        <Col md="8">
          <Daysbar pageShow={ (date = new Date('1/13/2020')) => {
             this.check(date)
          }}/>
          {this.state.moviesforDay.map((movie)=> {
            return <MovieCard changeFavoriteState={(state, movieId, userId) => this.props.changeFavoriteState(state, movieId, userId)} user={this.props.user}
            isFavorite={(movieId)=> this.props.isFavorite(movieId)} key={movie.i} movie={movie.movie} index={movie.i} isUserLoggedIn={this.props.isUserLoggedIn}/>
          })}
        </Col>
        <Col md="4">
            {trailers}
        </Col>
      </Row>
    </div>
    )
  } 
}

export default MainPage;
