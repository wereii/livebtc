import React from 'react';
import './App.css';
import exchanges from './exchanges/all';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'


class App extends React.Component {
  render() {
    return (
      <Container className="App">
        <Grid container direction="row" justify="flex-start" alignItems="center">
          {exchanges}
        </Grid>
      </Container>
    );
  }
}

export default App;