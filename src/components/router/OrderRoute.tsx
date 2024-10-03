import { Navigate, Outlet } from "react-router-dom"

type Props = {}

export default function PrivateRoute({ }: Props) {

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.roles[0] === "ROLE_SALE" || user.roles[0] === "ROLE_ADMIN") {
    return <Outlet />
  } else {
    return <Navigate to="/" />
  }
}