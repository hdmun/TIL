import Container from '@mui/material/Container';
import logo from '../logo.svg';

export default function Index() {
  return (
    <Container component="main" maxWidth="xs">
      <img src={logo} className="App-logo" alt="logo" />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </Container>
  )
}