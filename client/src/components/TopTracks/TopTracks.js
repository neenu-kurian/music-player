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
  }

});

//component that displays top tracks
class TopTracks extends PureComponent {
  
  //function to store the played song and get recommendations
  handleClick = (song) => {
    
    //to store the song during first play
    if((this.props.currentSong===undefined)&&(song!==null)){
    this.props.selectedSong(song)
    this.props.fetchRecommendations(this.props.token, song.artists[0].id, song.id)
    }
    
    //to check if same song is played again , if not show new recommendations and call action creators
    else if((this.props.currentSong!==null)&&(this.props.currentSong.id!==song.id)){
      this.props.selectedSong(song)
      this.props.fetchRecommendations(this.props.token, song.artists[0].id, song.id)
    }

    else
    {
      return null
    }
    
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
          {selectedTracks.map(eachTrack => (
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

              <audio controls ref="audio"  style={{width:'400px'}} src={eachTrack.preview_url} onPlay={() => this.handleClick(eachTrack)}>
              </audio>
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
    token: state.tokenReducer.token,
    currentSong: state.currentSongReducer.currentSong
  };

};

TopTracks.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, {selectedSong, fetchRecommendations, setToken})(TopTracks));
