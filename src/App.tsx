import React from 'react';
import SearchComponent from './search';
import Container from '@mui/material/Container';
import './App.css';
import Cat from "./cat";

function App() {
  return (
      <Container>
          <Cat />
          <SearchComponent />
      </Container>
  );
}

export default App;
