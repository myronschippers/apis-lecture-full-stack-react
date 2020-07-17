import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    songs: [],
    form: {
      artist: '',
      track: '',
      rank: '',
      published: '',
    }
  }

  componentDidMount() {
    console.log('READY');
    this.getSongs();
  }

  getSongs() {
    axios({
      method: 'GET',
      url: '/songs'
    })
      .then((response) => {
        // update state
        console.log('response', response.data);
        this.setState({
          songs: response.data,
        });
      })
      .catch((err) => {
        alert('There was a problem.')
      });
  }

  handleChangeInput(event, inputKey) {
    this.setState({
      form: {
        ...this.state.form,
        [inputKey]: event.target.value
      }
    }, () => {
      // console.log(this.state.form);
    });
  }

  saveSong(songData) {
    console.log('in saveSong:', songData);
    axios({
      method: 'POST',
      url: '/songs',
      data: songData,
    })
      .then((response) => {
        console.log('POST response:', response);
        this.getSongs();
      })
      .catch((err) => {
        alert('ERROR with POST');
      })
  }

  handleSongSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.form);
    // POST to server
    this.saveSong(this.state.form);
  }

  render() {
    const displaySongs = this.state.songs.map((item, index) => {
      return <div key={item.id}>{item.artist}: {item.track}, {item.rank}, and {item.published} </div>
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Songs!</h1>
        </header>
        <br/>
        <form onSubmit={this.handleSongSubmit}>
          <input
            type="text"
            placeholder="Artist"
            onChange={(event) => this.handleChangeInput(event, 'artist')}
          />
          <input
            type="text"
            placeholder="Track"
            onChange={(event) => this.handleChangeInput(event, 'track')}
          />
          <input
            type="number"
            placeholder="Rank"
            onChange={(event) => this.handleChangeInput(event, 'rank')}
          />
          <input
            type="text"
            placeholder="Published"
            onChange={(event) => this.handleChangeInput(event, 'published')}
          />
          <button>Save</button>
        </form>
        <p>Songs go here</p>
        {displaySongs}
      </div>
    );
  }
}

export default App;
