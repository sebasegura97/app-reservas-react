import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  makeStyles,
  useTheme,
} from "@material-ui/core"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MailIcon from "@material-ui/icons/Mail"
import { useLocation, useNavigate } from "@reach/router"
import React, { useEffect, useState } from "react"
import ClientesIcon from "../../icons/cliente.js"
import CubiertosIcon from "../../icons/cubiertos.js"
import GroupIcon from "../../icons/group.js"
import MenuCalendarIcon from "../../icons/menu-calendar.js"
import MessagesIcon from "../../icons/messages.js"
import TasksIcon from "../../icons/tasks.js"
import MesasIcon from "../../icons/tables.js"

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  toolbarTopContent: {
    backgroundColor: "white",
    padding: theme.spacing(1.5),
    margin: theme.spacing(2),
    borderRadius: 8,
    textTransform: "uppercase",
  },
  menuItemContainer: {
    transition: ".3s",
    color: theme.palette.text.secondary,
    fontSize: 18,
    "&:hover": {
      cursor: "pointer",
      boxShadow: `-8px 0px 0px 0px ${theme.palette.primary.main}`,
      transition: ".3s",
    },
  },
  menuItemSelected: {
    color: theme.palette.primary.main,
    fontWeight: "bolder",
    boxShadow: `-8px 0px 0px 0px ${theme.palette.primary.main}`,
    transition: ".3s",
    fontSize: 18,
    "&:hover": {
      cursor: "pointer",
      transition: ".3s",
    },
  },
  user: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  subitemContainer: {
    transition: ".6s",
    fontSize: 16,
    "&:hover": {
      cursor: "pointer",
      boxShadow: `-6px 0px 0px 0px ${theme.palette.text.secondary}`,
      transition: ".5s",
    },
  },
  subitemSelected: {
    transition: ".5s",
    fontSize: 16,
    fontWeight: "bold",
    boxShadow: `-6px 0px 0px 0px ${theme.palette.text.secondary}`,
    "&:hover": {
      cursor: "pointer",
      transition: ".5s",
    },
  },
}))

const TOP_MENU = [
  {
    label: "Inicio",
    path: "/admin/inicio",
    icon: MesasIcon,
  },
  {
    label: "Reservas",
    path: "/admin/reservas",
    icon: MenuCalendarIcon,
  },
  {
    label: "Clientes",
    path: "/admin/clientes",
    icon: ClientesIcon,
  },
  {
    label: "Resturante",
    path: "/admin/restaurante",
    icon: CubiertosIcon,
    subMenu: [
      {
        label: "Info",
        path: "/admin/restaurante/info",
      },
      {
        label: "Salas",
        path: "/admin/restaurante/salas",
      },
      {
        label: "Mesas",
        path: "/admin/restaurante/mesas",
      },
      {
        label: "Horarios",
        path: "/admin/restaurante/horarios",
      },
      {
        label: "Horarios alternativos",
        path: "/admin/restaurante/horarios-alternativos",
      },
    ],
  },
  {
    label: "Menus",
    path: "/admin/menus",
    icon: MessagesIcon,
    subMenu: [
      {
        label: "Menus",
        path: "/admin/menus/",
      },
      {
        label: "Platos",
        path: "/admin/menus/platos",
      },
      {
        label: "Bebidas",
        path: "/admin/menus/bebidas",
      },
      {
        label: "Alergenos",
        path: "/admin/menus/alergenos",
      },
    ],
  },
  {
    label: "Empleados",
    path: "/admin/empleados",
    icon: GroupIcon,
    subMenu: [
      {
        label: "Bajas y vacaciones",
        path: "/admin/empleados/bajas",
      },
      {
        label: "Tipos",
        path: "/admin/empleados/tipos",
      },
      {
        label: "Control horario",
        path: "/admin/empleados/control",
      },
      {
        label: "Acciones",
        path: "/admin/empleados/acciones",
      },
    ],
  },
]

const BOTTOM_MENU = [
  {
    label: "Mensajes",
    path: "/admin/mensajes",
    icon: MessagesIcon,
  },
  {
    label: "Tareas",
    path: "/admin/tareas",
    icon: TasksIcon,
  },
]

const MenuItem = ({ item }) => {
  const classes = useStyles()
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const isSelected = location.pathname === item.path

  const handleClick = () => {
    navigate(item.path)
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      paddingTop={2}
      paddingBottom={2}
      paddingRight={4}
      paddingLeft={3}
      marginLeft={1}
      className={
        !isSelected ? classes.menuItemContainer : classes.menuItemSelected
      }
      onClick={handleClick}
    >
      <Box width={28} height={28} marginRight={4}>
        {item.icon({
          fill: isSelected
            ? theme.palette.primary.main
            : theme.palette.text.secondary,
        })}
      </Box>
      <span>{item.label}</span>
    </Box>
  )
}

const MenuItemWithSubmenu = ({ item }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [itemSelected, setItemSelected] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = path => {
    navigate(path)
  }

  const toggleSubMenu = () => {
    setOpen(!open)
  }
  const closeSubMenu = () => {
    setOpen(false)
  }

  useEffect(() => {
    let isItemSelected = false
    item.subMenu.forEach(subitem => {
      if (location.pathname === subitem.path) {
        isItemSelected = true
      }
    })
    if (isItemSelected) {
      setItemSelected(true)
    } else {
      closeSubMenu()
      setItemSelected(false)
    }
  }, [location.pathname, item.subMenu])

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingTop={2}
        paddingBottom={2}
        paddingRight={4}
        paddingLeft={3}
        marginLeft={1}
        onClick={toggleSubMenu}
        className={
          itemSelected ? classes.menuItemSelected : classes.menuItemContainer
        }
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box width={28} height={28} marginRight={4}>
            {item.icon({
              fill: itemSelected
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
            })}
          </Box>
          <span>{item.label}</span>
        </Box>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box marginLeft={10} marginBottom={4}>
          {item.subMenu.map((subitem, index) => {
            const subitemSelected = location.pathname === subitem.path
            return (
              <Box
                key={index}
                display="flex"
                flexDirection="row"
                alignItems="center"
                padding={1}
                onClick={() => handleClick(subitem.path)}
                className={
                  subitemSelected
                    ? classes.subitemSelected
                    : classes.subitemContainer
                }
              >
                <span>{subitem.label}</span>
              </Box>
            )
          })}
        </Box>
      </Collapse>
    </>
  )
}

const MenuList = ({ list }) => {
  return (
    <List>
      {list.map((item, index) =>
        item.subMenu ? (
          <MenuItemWithSubmenu key={index} item={item} />
        ) : (
          <MenuItem key={index} item={item} />
        )
      )}
    </List>
  )
}

export default function Menu() {
  const classes = useStyles()
  const theme = useTheme()
  const [userMenu, setUserMenu] = useState(false)

  const toggleUserMenu = () => {
    setUserMenu(!userMenu)
  }

  return (
    <>
      <div className={classes.toolbar}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className={classes.toolbarTopContent}
        >
          <MailIcon color="primary" style={{ marginRight: 8, marginLeft: 8 }} />
          <span
            style={{
              color: theme.palette.text.primary,
              fontWeight: "bolder",
              fontSize: 16,
            }}
          >
            {" "}
            Administrador{" "}
          </span>
        </Box>
      </div>

      <Box marginTop={1}>
        <MenuList list={TOP_MENU} />
      </Box>

      <Box marginTop="AUTO">
        <MenuList list={BOTTOM_MENU} />
      </Box>

      <Box
        paddingLeft={1.5}
        paddingTop={1}
        paddingBottom={1}
        borderRadius={8}
        margin={2}
        className={classes.user}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Avatar className={classes.avatar}> J </Avatar>
        <Typography color="inherit" variant="body2">
          {" "}
          Julia Zanuttini{" "}
        </Typography>
        <IconButton color="inherit" onClick={toggleUserMenu}>
          <ExpandMoreIcon fontSize="small" />
        </IconButton>
      </Box>
    </>
  )
}
