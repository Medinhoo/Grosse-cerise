import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  errorLogin$,
  handleSubmit,
  loading$,
  logged$,
  signupSuccessMessage$,
  user$,
} from "../rxjs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Grosse Cerise
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(errorLogin$.value);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedSubscription = logged$.subscribe((isLogged) => {
      if (isLogged) {
        navigate("/lists");
      }
    });

    return () => {
      loggedSubscription.unsubscribe();
    };
  }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const subscription = signupSuccessMessage$.subscribe((message) => {
      setOpen(message !== "");
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = loading$.subscribe((l) => {
      setLoading(l);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = errorLogin$.subscribe((error) => {
      setErrorLogin(error);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {signupSuccessMessage$.getValue()}
          </MuiAlert>
        </Snackbar>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {errorLogin.value && (
                  <MuiAlert
                    onClose={() => setErrorLogin((e) => !e.value)}
                    autoHideDuration={1000}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {errorLogin.message}
                  </MuiAlert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/sign" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
