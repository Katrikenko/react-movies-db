import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LinearProgress } from "@mui/material";

interface AuthentificationGuardProps {
  component: React.ComponentType;
}

export function AuthenticationGuard({ component }: AuthentificationGuardProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LinearProgress />,
  });

  return <Component />;
}
