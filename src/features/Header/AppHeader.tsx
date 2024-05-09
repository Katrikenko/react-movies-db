import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthSection } from "./AuthSection";

interface AppHeaderProps {
  onLogin(): void;
  onLogout(): void;
}

export function AppHeader({ onLogin, onLogout }: AppHeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <img src={logo} className={styles.logo} alt="logo" /> */}
        <LiveTvOutlinedIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          The Movies DB
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/extra">Extra</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Box>
        <AuthSection />
      </Toolbar>
    </AppBar>
  );
}

function HeaderLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link component={RouterLink} to={to} variant="button" color="inherit" sx={{ my: 1, mx: 1.5 }}>
      {children}
    </Link>
  );
}
