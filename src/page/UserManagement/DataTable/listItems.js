import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Collapse, List } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LinkIcon from "@mui/icons-material/Link";
import { HourglassBottom } from "@mui/icons-material";
import { Stop } from "@mui/icons-material";
import { Portrait } from "@mui/icons-material";
import { TimeIcon } from "@mui/x-date-pickers";
import { LocalAirport } from "@mui/icons-material";
import {
  DirectionsCar,
  Inbox as InboxIcon,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { FlightTakeoff } from "@mui/icons-material";
import UpdateIcon from "@mui/icons-material/Update";
import ContentIcon from "@mui/icons-material/ContactEmergency";
import AdminIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import QueueIcon from '@mui/icons-material/Queue';

const menus = [
  {
    index: 0,
    link: "/dashboard/users",
    title: "users",
    icon: <PeopleIcon />,
  },
  {
    index: 1,
    link: "/dashboard/cars",
    title: "cars",
    icon: <DirectionsCar />,
  },
  {
    index: 2,
    link: "/dashboard/add-Admin",
    title: "Admin",
    icon: <AdminIcon />,
  },
  {
    index: 3,
    link: "/dashboard/extraOptions",
    title: "extraOptions",
    icon: <TimeIcon />,
  },
  {
    index: 4,
    link: "/dashboard/pointToPointBookss",
    title: "pointToPointBooks",
    icon: <LocationOnIcon />,
  },
  {
    index: 5,
    link: "/dashboard/additionalstop",
    title: "additional-stop",
    icon: <Stop />,
  },
  {
    index: 6,
    link: "/dashboard/hourlycharacter",
    title: "hourly-book",
    icon: <HourglassBottom />,
  },
  {
    index: 7,
    link: "/dashboard/add-Content",
    title: "Add  Content",
    icon: <UpdateIcon />,
  },
  {
    index: 8,
    link: "/dashboard/Content/ContentDetails",
    title: "Footer detail",
    icon: <ContentIcon />,
  },

  {
    index: 9,
    title: "AirP Booking",
    icon: <LocalAirport />,
    subItems: [
      {
        index: 0,
        link: "/dashboard/airports",
        title: "Airports",
        icon: <Portrait />,
      },
      {
        index: 1,
        link: "/dashboard/airportPickupPreference",
        title: "Port Preference",
        icon: <FlightTakeoff />,
      },
      {
        index: 2,
        link: "/dashboard/airportbook",
        title: "Airport Booking",
        icon: <LocalAirport />,
      },
    ],
  },
  {
    index: 10,
    link: "/dashboard/popular/popular-place",
    title: "Popular Places",
    icon: <AttachMoneyIcon />,
  },

  {
    index: 11,
    link: "/dashboard/social/social-media",
    title: "Social Media",
    icon: <LinkIcon />,
  },

  {
    index: 12,
    link: "/dashboard/gratuity",
    title: "Gratuity",
    icon: <QueueIcon />,
  },

];

function ListItems() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSubIndex, setSelectedSubIndex] = useState();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    menus.forEach((menu, index) => {
      if (menu.link === currentPath) {
        setSelectedIndex(index);
      }
    });
  }, []);

  const handleClick = (event, index) => {
    setSelectedIndex(index);
    if (menus[index].subItems) {
      setOpen(!open);
    } else {
      navigate(menus[index].link);
    }
  };

  const handleSubItemClick = (event, link, index) => {
    setSelectedIndex(null);
    setSelectedSubIndex(index);
    navigate(link);
  };

  return (
    <>
      {menus.map((menu, key) => (
        <React.Fragment key={menu.link}>
          <ListItemButton
            sx={{
              "&.Mui-selected": {
                color: "#488550",
                backgroundColor: "#FFF",
                borderRadius: "21.5px",
                paddingRight: "6px",
              },
            }}
            selected={selectedIndex === menu.index}
            onClick={(event) => {
              const index = menu.index;
              navigate(menu.link);
              handleClick(event, index);
            }}
          >
            <ListItemIcon
              sx={{ color: selectedIndex === menu.index && "#488550" }}
            >
              {menu.icon}
            </ListItemIcon>
            <ListItemText primary={menu.title} />
            {menu.subItems && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          {menu.subItems && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menu.subItems.map((subItem, itemindex) => (
                  <ListItemButton
                    key={subItem.index}
                    sx={{
                      pl: 6,
                      "&.Mui-selected": {
                        color: "#488550",
                        backgroundColor: "#FFF",
                        borderRadius: "21.5px",
                        paddingRight: "6px",
                      },
                    }}
                    selected={selectedSubIndex === subItem.index}
                    onClick={(event) =>
                      handleSubItemClick(event, subItem.link, subItem.index)
                    }
                  >
                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default ListItems;
