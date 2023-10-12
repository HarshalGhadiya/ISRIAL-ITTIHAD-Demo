// ** React Imports
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { useTranslation } from "react-i18next";

// ** Reactstrap Imports
import { Badge } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as mqtt from 'mqtt/dist/mqtt.min'
import { getComment, getCount, setPendingCount } from "../../../../../redux/commentSlice";
import { getPage } from "../../../../../redux/pageSlice";

const VerticalNavMenuLink = ({ item, activeItem }) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? "a" : NavLink;
  const count = useSelector((state) => state?.root?.comment?.pendingPageCommentCount)
  
  const [pendingPageCount, setPendingPageCount] = useState()
  const [pendingCommnetCount, setPendingCommnetCount] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // ** Hooks
  const { t } = useTranslation();
  const mqttHost = import.meta.env.VITE_APP_MQTTHOST_URL; // Use WebSocket URL

  useEffect(() => {
    setPendingPageCount(count?.pendingPageCount)
    setPendingCommnetCount(count?.pendingCommnetCount)
  }, [count])
  

  useEffect(() => {
    if(item?.id == 'pages' || item?.id == 'comments') {
    const site = localStorage.getItem('usersite')
    const client = mqtt.connect(mqttHost);

    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe(`UpdatedCount:${site}`);
    });

    client.on('message', (topic, message) => {
        const data = JSON.parse(message)
        const commentApiData = JSON.parse(localStorage.getItem('commentApiData'))
        const pageApiData = JSON.parse(localStorage.getItem('pageApiData'))

        dispatch(setPendingCount(data));
        setPendingPageCount(data.pendingPageCount)
        setPendingCommnetCount(data.pendingCommnetCount)
        if(item?.id == window.location?.pathname.substring(1) && window.location?.pathname == "/comments"){
          dispatch(getComment(navigate, commentApiData?.currentPage,commentApiData?.rowsPerPage, commentApiData?.searchValue, commentApiData?.sortDirection, commentApiData?.column, commentApiData?.id, commentApiData?.user_id, false))
        }
        if(item?.id == window.location?.pathname.substring(1) && window.location?.pathname == "/pages") {
          dispatch(getPage(navigate,pageApiData?.currentPage, pageApiData?.rowsPerPage, pageApiData?.searchValue, pageApiData?.sortDirection, pageApiData?.column,false))
        }
    });
    return () => {
        client.end(); // Disconnect from the MQTT broker when the component unmounts
    };
  }
}, []);

  return (
    <li
      className={classnames({
        "nav-item": !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem,
      })}
    >
      <LinkTag
        className="d-flex align-items-center"
        target={item.newTab ? "_blank" : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || "/",
            }
          : {
              to: item.navLink || "/",
              className: ({ isActive }) => {
                if (isActive && !item.disabled) {
                  return "d-flex align-items-center active";
                } else {
                  return "d-flex align-items-center";
                }
              },
            })}
        onClick={(e) => {
          if (
            item.navLink.length === 0 ||
            item.navLink === "#" ||
            item.disabled === true
          ) {
            e.preventDefault();
          }
        }}
      >
        {item.icon}
        <span className="menu-item text-truncate">{t(item.title)}</span>

        {item.badge && item.badgeText ? (
          <Badge className="ms-auto me-1" color={item.badge} pill>
            {item?.id == 'pages' ? pendingPageCount : item?.id == 'comments' ? pendingCommnetCount : item.badgeText}
          </Badge>
        ) : null}
      </LinkTag>
    </li>
  );
};

export default VerticalNavMenuLink;
