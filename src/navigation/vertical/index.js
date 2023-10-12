import {
  Users,
  FileText,
  MessageCircle,
  Settings,
  AlertOctagon,
  User,
} from "react-feather"

export default [

  {
    id: "comments",
    title: "Comments",
    badge: 'danger',
    badgeText: '2',
    icon: <MessageCircle size={20} />,
    navLink: "/comments",
    Permissions: [
      "all",
      "israel-admin",
      "ittihad-admin",
      "israel-comment-admin",
      "ittihad-comment-admin",
      "israel-user",
      "ittihad-user",
    ],
  },
  {
    id: "users",
    title: "Users",
    icon: <Users size={20} />,
    navLink: "/users",
    Permissions: ["all", "israel-admin", "ittihad-admin"],
  },
  {
    id: "pages",
    title: "Pages",
    badge: 'danger',
    badgeText: '2',
    icon: <FileText size={20} />,
    navLink: "/pages",
    Permissions: [
      "all",
      "israel-admin",
      "ittihad-admin",
      "israel-page-admin",
      "ittihad-page-admin",
    ],
  },
  {
    id: "systemAdmins",
    title: "System admins",
    icon: <User size={20} />,
    navLink: "/system-admins",
    Permissions: ["all", "super-admin", "israel-admin", "ittihad-admin"],
  },
  {
    id: "harmfulWords",
    title: "Harmful words",
    icon: <AlertOctagon size={20} />,
    navLink: "/harmful-words",
    Permissions: ["all", "israel-admin", "ittihad-admin"],
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings size={20} />,
    navLink: "/settings",
    Permissions: ["all", "israel-admin", "ittihad-admin"],
  },
]
