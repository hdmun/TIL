import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  authenticated: boolean;
  redirectTo: string
  element: JSX.Element;
}

// https://www.robinwieruch.de/react-router-private-routes/

export default function AuthRoute(props: AuthRouteProps) {
  if (props.authenticated) {
    return props.element;
  }

  return <Navigate to={props.redirectTo} replace />;
}
