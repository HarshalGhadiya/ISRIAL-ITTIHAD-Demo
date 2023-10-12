import { lazy } from "react"
const SystemadminTable = lazy(() => import("../../views/systemAdmin/SystemAdminTable"))
const SystemadminRoleType = lazy(() =>
  import("../../views/systemAdmin/SystemAdminTypeForm")
)
const SystemadminEdit = lazy(() =>
  import("../../views/systemAdmin/SystemAdmineditForm")
)
const SystemadminaddForm = lazy(() =>
  import("../../views/systemAdmin/SystemAdminaddForm")
)

const SystemAdminRoute = [
  {
    id: "systemAdmins",
    path: "/system-admins",
    element: <SystemadminTable />,
    meta: {
      className: "system-application",
    },
  },
  {
    id: "systemAdmins",
    path: "/system-admins/:id",
    element: <SystemadminEdit />,
    meta: {
      className: "system-application",
    },
  },
  {
    id: "systemAdmins",
    path: "/system-admins/new",
    element: <SystemadminaddForm />,
    meta: {
      className: "system-application",
    },
  },
  {
    id: "systemAdmins",
    path: "/system-admins/type/:id",
    element: <SystemadminRoleType />,
    meta: {
      className: "system-application",
    },
  },
  {
    id: "systemAdmins",
    path: "/system-admins/new-type",
    element: <SystemadminRoleType />,
    meta: {
      className: "system-application",
    },
  },
]
export default SystemAdminRoute
