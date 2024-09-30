import { Outlet, Navigate } from "react-router-dom"

type Props = {}

export default function PrivateRoute({ }: Props) {

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.roles) {
    console.log("LOGIN")
    return <Outlet />
  } else {
    return <Navigate to="/login" />
  }
}