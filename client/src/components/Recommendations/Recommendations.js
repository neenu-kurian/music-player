import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {selectedSong} from '../../actions/userActions'

//material-ui components
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import {withStyles} from '@material-ui/core/styles';

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
    transform: 'translateZ(0)',
    height: 400,
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
    width: 400
  },
  recommendations: {
    fontSize: '30px',
    color: 'white'
  },
  button: {
    margin: theme.spacing.unit
  }
})

class Recommendations extends PureComponent {
  
  //function to store the currently played song
  handleClick = (song) => {
    if ((this.props.currentSong)&&(!(this.props.currentSong.id === song.id))) {
      this.props.selectedSong(song)
    }
  }
  
  //to render recommended songs
  render() {

    const {classes} = this.props
    const recommendedSongs = this.props.recommendations;

    if (!recommendedSongs) 
      return null

    return (
     <div className={classes.root}>

       <ListSubheader component="div" className={classes.recommendations}>Recommendations</ListSubheader>

       <GridList className={classes.gridList} cols={2.5}>
          {
            recommendedSongs.map(eachRecommendation => (
            
            <div key={eachRecommendation.id}>
            
              <GridListTile className={classes.tile}>
                <img src={eachRecommendation.album.images[0].url} alt={"song"}/>
                    <GridListTileBar
                       title={eachRecommendation.album.name}
                       classes={
                         {
                           root: classes.titleBar,
                           title: classes.title
                         }
                    }/>
              </GridListTile>
               <audio
                id={eachRecommendation.id}
                controls
                style={{width:'400px'}}
                src={eachRecommendation.preview_url}
                onPlay={() => this.handleClick(eachRecommendation)}>
              </audio>
            </div>

          ))
        }
       </GridList>
     </div>
    );

  }
}

const mapStateToProps = (state) =>
{
  return {
    recommendations: state.recommendationsReducer.recommendations? state.recommendationsReducer.recommendations: "",
    currentSong: state.currentSongReducer.currentSong
  };
};

Recommendations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps,{selectedSong})(Recommendations));
