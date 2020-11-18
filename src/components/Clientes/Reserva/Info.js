import { Box, makeStyles, Typography } from "@material-ui/core"
import React, { useContext } from "react"
import CalendarIcon from "../../../icons/calendar.js"
import ClockIcon from "../../../icons/clock.js"
import GroupIcon from "../../../icons/group.js"
import { ContextReserva } from "./ContextReserva.js"

const useStyles = makeStyles(theme => ({
  container: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  content: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    color: "white",
  },
  row: {
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(2),
    fill: "white"
  },
  header: {
    color: theme.palette.primary.main,
    fontWeight: 400,
  },
}))

export default function Info() {
  const classes = useStyles()
  const { context } = useContext(ContextReserva)

  return (
    <Box className={classes.container}>
      <Box padding={1}>
        <Typography align="center" className={classes.header} variant="body1">
          Informacion de reserva
        </Typography>
      </Box>
      <Box className={classes.content}>
        <Box marginTop={1} className={classes.row}>
          <Box className={classes.icon} width={16}>
            <CalendarIcon fill="white" />
          </Box>
          <Typography color="inherit" variant="body2">
            { context.dia.getDate() } /{" "}
            { context.dia.getMonth() + 1 } /{" "}
            { context.dia.getFullYear() }
          </Typography>
        </Box>
        <Box className={classes.row}>
          <Box className={classes.icon} width={16}>
            <ClockIcon />
          </Box>
          <Typography color="inherit" variant="body2">
            {context.hora}
          </Typography>
        </Box>
        <Box className={classes.row}>
          <Box className={classes.icon} width={16}>
            <GroupIcon />
          </Box>
          <Typography color="inherit" variant="body2">
            {context.cantidadDePersonas}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
