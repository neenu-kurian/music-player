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
  recommendations: {
    fontSize: '30px',
    color: 'white'
  },
  playbutton: {
    color:'black',
    backgroundColor:'white'
  }
})

class Recommendations extends PureComponent {
  
  //function to store the currently played song
  selectSong = (song,index) => {
    this.props.selectedSong(song,index)
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
            recommendedSongs.map((eachRecommendation,index) => (
            
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
                
             <Button className={classes.playbutton} onClick={()=>this.selectSong(eachRecommendation,index)}>Select</Button>

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
