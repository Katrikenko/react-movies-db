import { Typography, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { UserSettingsMenu } from "./UserSettingsMenu";
import { useNavigate } from "react-router-dom";

export function AuthSection() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const navigate = useNavigate();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  const onLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  // if (isAuthenticated) {
  //   return (
  //     <>
  //       <Typography>Hello, {user?.name}!</Typography>
  //       <Button color="inherit" variant="outlined" sx={{ ml: 1.5 }} onClick={onLogout}>
  //         Log out
  //       </Button>
  //     </>
  //   );
  // }
  return isAuthenticated && user ? (
    <UserSettingsMenu user={user} onLogout={onLogout} onOpenProfile={() => navigate("/profile")} />
  ) : (
    <Button color="inherit" variant="outlined" onClick={onLogin}>
      Log in
    </Button>
  );
}
