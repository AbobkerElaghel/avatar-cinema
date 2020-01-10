import React, { Component } from 'react';
import MovieController from './MovieController'
import UserController from './UserConttroller'
import {  Row, Col ,Container ,Button} from 'reactstrap';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom'
import AdminLogin from './adminLogin.js'


class Dashboard extends React.Component {

constructor(props) {

  super(props)

  this.state = {
    users : [] ,
    movieShow : true,
    isAdminLoggedIn: false
  };
};

// componentDidMount() {
  
//   axios.get("/api/users").then(res =>{

//     this.setState({
//       users : [...res.data]

//     })} ).catch(err => console.log(err))
  
// }

changeAdminState(state) {
  this.setState({
    isAdminLoggedIn: state
  })
}

render(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path={`${this.props.match.path}`} exact component={()=> {
          return <div>
          {this.state.isAdminLoggedIn?<Row>
            <Col md="2" className="text-center">
              <Button onClick={()=>this.setState({movieShow : false })}>user</Button>
              <Button onClick={()=>this.setState({movieShow : true })}>movie</Button>  
            </Col>
            <Col md="10">
              { this.state.movieShow ? <MovieController  movies={this.props.movies} handleUpdate={(updatedMovie, movieData)=> this.props.handleUpdate(updatedMovie, movieData)}
              handleAdd={(addedMovie)=> this.props.handleAdd(addedMovie)}
              handleDelete={(deletedMovie)=> this.props.handleDelete(deletedMovie)}/> : <UserController users={userData}/>
            }
            </Col>
          </Row>:
          <Redirect to={`${this.props.match.url}/login`} />}
          </div>
        }}/>

        <Route path={`${this.props.match.path}/login`} component={(data)=> {
          return <AdminLogin changeAdminState={(state)=> this.changeAdminState(state)} history={data.history}/>
        }}/>

      </Switch>
    </BrowserRouter>
  )
}

}


export default Dashboard;


const userData = [{
  userName :"weeeha",
  firstName :"moahemd",
  lastName : "fared",
  userEmail:"weeehbla@gmail.com"
},
{
  userName :"weasdeeha",
  firstName :"moahemd",
  lastName : "salah",
  userEmail:"weeeasdhbla@gmail.com"
},
{
  userName :"asd",
  firstName :"ah,ed",
  lastName : "fared",
  userEmail:"weeasdehbla@gmail.com"
}
]