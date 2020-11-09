import React from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import MailIcon from "@material-ui/icons/Mail"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import MesasIcon from "../../icons/mesas.svg"
import ClockIcon from "../../icons/clock.svg"
import MenuCalendarIcon from "../../icons/menu-calendar.svg"
import GroupIcon from "../../icons/group.svg"
import MessagesIcon from "../../icons/messages.svg"
import TasksIcon from "../../icons/tasks.svg"
import MenuIcon from "../../icons/menu.svg"
import { Box } from "@material-ui/core"
import { IconButton as CustomIconButton } from "../CustomButtons"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "white",
    color: theme.palette.primary.dark,
    // boxShadow: "none",
    height: 100,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    display: "flex",
    alignContent: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuItemText: {
    color: "white",
    fontSize: 18,
    fontWeight: "normal",
  },
  toolbarTopContent: {
    backgroundColor: "white",
    padding: theme.spacing(1.5),
    margin: theme.spacing(2),
    borderRadius: 8,
    textTransform: "uppercase",
  },
  menuItemContainer: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}))

const MENU_ITEMS = [
  {
    label: "Mesas",
    path: "/admin/mesas",
    icon: <MesasIcon />,
  },
  {
    label: "Reservas",
    path: "/admin/reservas",
    icon: <MenuCalendarIcon />,
  },
  {
    label: "Clientes",
    path: "/admin/clientes",
    icon: <GroupIcon />,
  },
  {
    label: "Horarios y fichajes",
    path: "/admin/horarios",
    icon: <ClockIcon />,
  },
  {
    label: "Mensajes",
    path: "/admin/mensajes",
    icon: <MessagesIcon />,
  },
  {
    label: "Tareas",
    path: "/admin/tareas",
    icon: <TasksIcon />,
  },
]

function ResponsiveDrawer(props) {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <>
      <div className={classes.toolbar}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className={classes.toolbarTopContent}
        >
          <MailIcon
            color="primary"
            style={{ marginRight: 18, marginLeft: 12 }}
          />
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
      <List style={{ marginTop: theme.spacing(4) }}>
        {MENU_ITEMS.map((item, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="row"
            alignItems="center"
            marginLeft={4}
            paddingTop={2}
            paddingBottom={2}
            className={classes.menuItemContainer}
          >
            <Box width={28} height={28} marginRight={4}>
              {item.icon}
            </Box>
            <Typography variant="body1" className={classes.menuItemText}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </List>
    </>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Box>
            <CustomIconButton
              onClick={handleDrawerToggle}
              icon={<MenuIcon />}
            />
            <CustomIconButton icon={<MesasIcon />} />
          </Box>
        </Box>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default ResponsiveDrawer
