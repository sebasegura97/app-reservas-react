import { Box, makeStyles } from "@material-ui/core"
import React, { useContext } from "react"
import logo from "../../images/logocm.png"
import { ContextAdmin } from "./ContextAdmin"

const useStyles = makeStyles(theme => ({
  logo: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}))

export default function Header() {
  const classes = useStyles()
  const { context, setContext } = useContext(ContextAdmin)
  const toggleDrawer = () => {
    setContext({ ...context, drawerOpen: !context.drawerOpen })
  }

  return (
    <img
      src={logo}
      width={64}
      height={64}
      onClick={toggleDrawer}
      className={classes.logo}
      alt="Boton para abrir la navegacion."
    ></img>
  )
}
