import { Box, makeStyles, Slide } from "@material-ui/core"
import React from "react"
import CalendarIcon from "../../../../icons/calendar.js"
import CubiertosIcon from "../../../../icons/cubiertos.js"
import MenuCalendarIcon from "../../../../icons/menu-calendar.js"
import MenuIcon from "../../../../icons/menu.js"
import MesasIcon from "../../../../icons/tables.js"
import TazaIcon from "../../../../icons/taza.js"
import { IconButton as CustomIconButton } from "../../../CustomButtons"
import DayOfWeekPicker from "../../../Datepicker/DayOfWeekPicker"

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.dark,
    boxShadow: "none",
    height: "auto",
    width: "max-content",
    float: "right",
    position: "fixed",
    right: 8,
    top: 8,
  },
}))

export default function Header() {
  const classes = useStyles()

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Box
        display="flex"
        alignItems="center"
        marginTop={1}
        justifyContent="flex-end"
        className={classes.appBar}
      >
        <Box>
          <CustomIconButton style={{ marginBottom: 4 }} icon={MenuIcon} />
          <CustomIconButton icon={MesasIcon} />
        </Box>
        <Box marginLeft={1} marginRight={1}>
          <CustomIconButton
            icon={CalendarIcon}
            label="Hoy"
            height="104px"
            variant="vertical"
          />
        </Box>
        <Box>
          <DayOfWeekPicker />
        </Box>
        <Box marginLeft={1}>
          <CustomIconButton
            icon={MenuCalendarIcon}
            label="Mar 09/02/2020"
            height="50px"
            variant="horizontal"
          />
          <Box display="flex" marginTop={0.5}>
            <Box marginRight={0.5}>
              <CustomIconButton
                icon={TazaIcon}
                label="Comida"
                height="50px"
                variant="horizontal"
              />
            </Box>
            <Box>
              <CustomIconButton
                icon={CubiertosIcon}
                label="Cena"
                height="50px"
                variant="horizontal"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Slide>
  )
}
