export const CURRENT_SONG = "CURRENT_SONG"
export const FETCH_USER_ERROR = "FETCH_USER_ERROR"
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS"
export const FETCH_TOP_TRACK_ERROR = "FETCH_TOP_TRACK_ERROR"
export const FETCH_TOP_TRACK_SUCCESS = "FETCH_TOP_TRACK_SUCCESS"
export const FETCH_RECOMMENDATIONS_ERROR = "FETCH_RECOMMENDATIONS_ERROR"
export const FETCH_RECOMMENDATIONS_SUCCESS = "FETCH_RECOMMENDATIONS_SUCCESS"

//to check if user is successfully fetched
export const fetchUserSuccess = (user) => {
  return {type: 'FETCH_USER_SUCCESS', user};
};

export const fetchUserError = () => {
  return {type: 'FETCH_USER_ERROR'};
};

//to check if top tracks is successfully fetched
export const fetchTopTrackSuccess = (res) => {
  return {type: 'FETCH_TOP_TRACK_SUCCESS', payload: res.items}
}

export const fetchTopTrackError = () => {
  return {type: 'FETCH_TOP_TRACK_ERROR'}
}

//to fetch is recommendations is successfully fetched
export const fetchRecommendationsSuccess = (res) => {
  return {type: 'FETCH_RECOMMENDATIONS_SUCCESS', payload: res.tracks}
}

export const fetchRecommendationsError = (res) => {
  return {type: 'FETCH_RECOMMENDATIONS_ERROR'}
}

//action to fetch user details
export const fetchUser = (accessToken) => {

  return dispatch => {
    const request = new Request('https://api.spotify.com/v1/me', {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request).then(res => {
      // send user back to homepage if no token
      if (res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      dispatch(fetchUserSuccess(res));
    }).catch(err => {
      dispatch(fetchUserError(err));
    });
  };
};

//action to fetch top tracks
export const fetchTopTracks = (accessToken) => {

  return dispatch => {
    const request = new Request('https://api.spotify.com/v1/me/top/tracks', {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request).then(res => {
      // send user back to homepage if no token
      if (res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      dispatch(fetchTopTrackSuccess(res));
    }).catch(err => {
      dispatch(fetchTopTrackError(err));
    });
  };
}

//to store current played song
export const selectedSong = (song) => ({type: CURRENT_SONG, payload: song})

//to fetch recommendations
export const fetchRecommendations = (accessToken, seed_artists = "4NHQUGzhtTLFvgF5SZesLK", seed_tracks = "0c6xIDDpzE81m2q797ordA") => {

  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists}&seed_tracks=${seed_tracks}`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request).then(res => {
      // send user back to homepage if no token
      if (res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      dispatch(fetchRecommendationsSuccess(res));
    }).catch(err => {
      dispatch(fetchRecommendationsError(err));
    });
  };
}
