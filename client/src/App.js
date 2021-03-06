import React, { Component } from 'react';
import { connect } from 'react-redux';
//components
import Header from './components/Header';
import TopTracks from './components/TopTracks/TopTracks'
import Recommendations from './components/Recommendations/Recommendations'
//action creators
import { fetchUser,fetchTopTracks,fetchRecommendations} from './actions/userActions';
import { setToken } from './actions/tokenActions';
//css
import './App.css';
import MediaControl from './components/CurrentSong/MediaControl';

class App extends Component {

  //to get access token from url fragment. i used implicit grant here for login 
  componentDidMount(){

    let hashParams = {};
	  let e, r = /([^&;=]+)=?([^&;]*)/g,
	    q = window.location.hash.substring(1);
	  while ( (e = r.exec(q))!=null) {
	    hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    
    if(!hashParams.access_token) {
	    window.location.href = 'https://accounts.spotify.com/authorize?client_id=a417fb58f6c84d0e83555b8137882a97&scope=user-read-email%20user-top-read%20user-read-private%20user-modify-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
	  } else {
	    this.props.setToken(hashParams.access_token);
	  }
   
  }
  
  //fetches user details, top tracks and recommendations
  componentWillReceiveProps(nextProps) {

	  if(nextProps.token) {
      this.props.fetchUser(nextProps.token);
      this.props.fetchTopTracks(nextProps.token);
      this.props.fetchRecommendations(nextProps.token)
    };
  }

  render() 
  {
    return (
        <div >
        <Header/>
        <MediaControl/>
        <TopTracks/>
        <Recommendations/>
        </div>);
  }
}

const mapStateToProps = (state) => {

  return {
    token: state.tokenReducer.token
  };

};



export default connect(mapStateToProps, {setToken,fetchUser,fetchTopTracks,fetchRecommendations})(App);
