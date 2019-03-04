import React from 'react';
import axios from 'axios';

const api = process.env.REACT_APP_BASIC_AUTH_URL;

const auth = ({ username, password }) =>
  axios.post(api, JSON.stringify({ username, password }), {
    headers: { 'content-type': 'application/json' },
  });

const styles = {
  main: {
    textAlign: 'center',
    marginTop: '15px',
  },
};

function DummyAuth({ children }) {
  const [isAuth, setIsAuth] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await auth({ username, password });
      localStorage.setItem('dummy-auth', 'loggedin');
      setIsAuth(true);
    } catch (e) {
      alert(e);
    }
  };

  React.useEffect(() => {
    const isAuth = localStorage.getItem('dummy-auth');
    setIsAuth(!!isAuth);
  }, [isAuth]);

  if (isAuth === null) return <div />;
  return isAuth ? (
    children
  ) : (
    <form onSubmit={onSubmit} style={styles.main}>
      <label>username </label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label>password </label>
      <input
        type="password"
        name="username"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input type="submit" value="Login" />
    </form>
  );
}

export default DummyAuth;
