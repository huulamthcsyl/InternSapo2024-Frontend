import { Outlet, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type Props = {}

export default function PrivateRoute({ }: Props) {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.roles[0] === "ROLE_SALE" || user.roles[0] === "ROLE_ADMIN") {
    return <Outlet />
  } else {
    toast.error("Bạn không có quyền truy cập vào trang này")
    navigate('/')
  }

  return (
    <Outlet />
  )
}