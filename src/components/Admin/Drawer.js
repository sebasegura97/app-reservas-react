import Drawer from "@material-ui/core/Drawer"
import { makeStyles } from "@material-ui/core/styles"
import React, { useContext } from "react"
import { ContextAdmin } from "./ContextAdmin.js"
import Menu from "./Menu.js"

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    display: "flex",
    alignContent: "center",
    overflow: "overlay",
  },
}))

const drawerWidth = 300

export default function DrawerNavigation() {
  const classes = useStyles()
  const { context, setContext } = useContext(ContextAdmin)

  const toggleDrawer = () => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setContext({ ...context, drawerOpen: !context.drawerOpen })
  }

  return (
    <>
      <Drawer
        anchor="left"
        open={context.drawerOpen}
        onClose={toggleDrawer()}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Menu />
      </Drawer>
    </>
  )
}
