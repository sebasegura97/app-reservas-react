import { Box, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import CalendarIcon from "../../../icons/calendar.js"
import ClockIcon from "../../../icons/clock.svg"
import GroupIcon from "../../../icons/group.svg"

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
  },
  header: {
    color: theme.palette.primary.main,
    fontWeight: 400
  }
}))

export default function Info() {
  const classes = useStyles()
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
            <CalendarIcon />
          </Box>
          <Typography color="inherit" variant="body2">
            24 / 09 / 2020
          </Typography>
        </Box>
        <Box className={classes.row}>
          <Box className={classes.icon} width={16}>
            <ClockIcon />
          </Box>
          <Typography color="inherit" variant="body2">
            13:30
          </Typography>
        </Box>
        <Box className={classes.row}>
          <Box className={classes.icon} width={16}>
            <GroupIcon />
          </Box>
          <Typography color="inherit" variant="body2">
            Grupo
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
