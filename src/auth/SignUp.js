import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    textAlign: "center",
    backgroundColor: "#282c34",
    color: "#f4f5f7",
  },
  form: {
    marginTop: theme.spacing(3),
    '& label': {
      color: "#f4f5f7",
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  notchedOutline: {
    borderColor: '#f4f5f7',
  },
  inputText: {
    color: "#f4f5f7"
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

const SignUp = ({ history }) => {
  const classes = useStyles();

  const { signup } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signup(email.value, password.value, history);
  };

  const handleToLoginPage = () => {
    history.push("/login");
  }

  const { login } = useContext(AuthContext);

  const handleGuestLogin = e => {
    e.preventDefault();
    const email = "guest@example.com"
    const password = "testtesttesttest"
    login(email, password, history);
  }

  const handleToSignUpPage = () => {
    history.push("/signup");
  }

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <h3>新規登録はこちら</h3>
        <form className={classes.form} onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              className: classes.inputText,
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              className: classes.inputText,
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleToSignUpPage}
            className={classes.submit}
          >
            新規登録
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleToLoginPage}
          >
            登録済みの方はこちら
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleGuestLogin}
          >
            テストユーザーでログイン
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default withRouter(SignUp);