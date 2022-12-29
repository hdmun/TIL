import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'

import { Button, Link } from '@mui/material';
import Container from '@mui/material/Container';

import logo from '../logo.svg';
import { useLazyGetUsersQuery } from '../service/usersAPI';

export default function Index() {
  const [trigger] = useLazyGetUsersQuery()

  const [message, setMessage] = useState('Learn React')

  const handleUsersRequest = async () => {
    try {
      const { data } = await trigger(null);
      setMessage(data?.message ?? 'response error');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <img src={logo} className="App-logo" alt="logo" />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        {message}
      </a>
      <div>
        <Link component={RouterLink} to="/signin" variant="body2">
          Sign in
        </Link>
      </div>
      <div>
        <Link component={RouterLink} to="/signup" variant="body2">
          Sign up
        </Link>
      </div>
      <div>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleUsersRequest}
        >
          /users
        </Button>
      </div>
    </Container>
  )
}