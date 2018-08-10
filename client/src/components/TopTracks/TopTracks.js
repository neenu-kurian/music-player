import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {selectedSong, fetchRecommendations} from '../../actions/userActions'
import {setToken} from '../../actions/tokenActions';
import {connect} from "react-redux";

//material-ui css
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button'

//material-ui styles
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'black'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps
    // keeping high FPS.
    transform: 'translateZ(0)',
    height: 500,
    backgroundColor: 'black'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 1' +
        '00%)'
  },
  tile: {
    height: 350,
    width: 400,
    maxWidth: '100%',
    marginBottom: '40px'
  },
  topTracks: {
    fontSize: '30px',
    color: 'white'
  },
  playbutton:{
    color:'black',
    backgroundColor:'white'
  }

});

//component that displays top tracks
class TopTracks extends PureComponent {

  // audio=new Audio();
  // state={playing:false}
  
  //function to store the played song and get recommendations
  selectSong = (song,index) => {
    this.props.selectedSong(song,index)
    this.props.fetchRecommendations(this.props.token, song.artists[0].id, song.id)
  }

  

  render() {

    const selectedTracks = this.props.topTracks;
    const {classes} = this.props

    if (!selectedTracks) {
      return null
    }

    return (
      
      <div className={classes.root}>
        <ListSubheader component="div" className={classes.topTracks}>Top Tracks</ListSubheader>
        <GridList className={classes.gridList} cols={2.5}>
          {selectedTracks.map((eachTrack,index)=> (
            <div key={eachTrack.id}>
              <GridListTile className={classes.tile}>
                <img src={eachTrack.album.images[0].url} alt={"song"}/>
                <GridListTileBar
                  title={eachTrack.album.name}
                  classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}/>
              </GridListTile>
             
             <Button className={classes.playbutton} onClick={()=>this.selectSong(eachTrack,index)}>Select</Button>

            </div>
          ))}
        </GridList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    topTracks: state.topTracksReducer.topTracks? state.topTracksReducer.topTracks: "",
    token: state.tokenReducer.token
  };

};

TopTracks.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, {selectedSong, fetchRecommendations, setToken})(TopTracks));
