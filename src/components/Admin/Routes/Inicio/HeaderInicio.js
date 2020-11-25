import { Box, makeStyles, Slide, useTheme } from "@material-ui/core"
import { format } from "date-fns"
import React, { useContext } from "react"
import CalendarIcon from "../../../../icons/calendar.js"
import CubiertosIcon from "../../../../icons/cubiertos.js"
import MenuCalendarIcon from "../../../../icons/menu-calendar.js"
import MenuIcon from "../../../../icons/menu.js"
import TazaIcon from "../../../../icons/taza.js"
import { getDayName } from "../../../../utils/date.js"
import { IconButton as CustomIconButton } from "../../../CustomButtons"
import DayOfWeekPicker from "../../../Datepicker/DayOfWeekPicker"
import { ContextInicio } from "./ContextInicio.js"

const useStyles = makeStyles(theme => ({
  appBar: {
    // backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.dark,
    boxShadow: "none",
    height: "auto",
    width: "max-content",
    float: "right",
    position: "fixed",
    display: "flex",
    alignItems: "flex-start",
    right: 8,
    top: 8,
  },
}))

export default function HomeHeader() {
  const classes = useStyles()
  const theme = useTheme()
  const { store, dispatch } = useContext(ContextInicio)

  const toggleTable = () => {
    dispatch({ type: "toggle_table" })
  }

  const handleDayOfWeekPicker = value => {
    dispatch({
      type: "change_query",
      payload: {
        name: "fecha",
        value,
      },
    })
  }

  const handleButtonHoy = () => {
    dispatch({
      type: "change_query",
      payload: {
        name: "fecha",
        value: new Date(),
      },
    })
  }
  const handleChangeTurno = value => {
    dispatch({
      type: "change_query",
      payload: {
        name: "turno",
        value,
      },
    })
  }

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Box
        display="flex"
        alignItems="flex-end"
        marginTop={1}
        justifyContent="flex-end"
        className={classes.appBar}
      >
        <Box>
          <CustomIconButton
            onClick={toggleTable}
            style={{
              marginBottom: 4,
              backgroundColor: store.mostrarTabla
                ? theme.palette.primary.main
                : "white",
              fill: store.mostrarTabla ? "white" : theme.palette.text.primary,
            }}
            icon={MenuIcon}
          />
          {/* <CustomIconButton icon={MesasIcon} onClick={handleToggleList} /> */}
        </Box>
        <Box marginLeft={1} marginRight={1}>
          <CustomIconButton
            icon={CalendarIcon}
            label="Hoy"
            height="104px"
            variant="vertical"
            onClick={handleButtonHoy}
          />
        </Box>
        <Box>
          <DayOfWeekPicker
            value={store.queryParams.fecha}
            onChangeDay={handleDayOfWeekPicker}
          />
        </Box>
        <Box marginLeft={1}>
          <CustomIconButton
            icon={MenuCalendarIcon}
            label={`${getDayName({
              shortname: true,
              dayNumber: store.queryParams.fecha.getDay(),
            })} ${format(store.queryParams.fecha, "dd/MM/yyyy")}`}
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
                style={{
                  marginBottom: 4,
                  backgroundColor:
                    store.queryParams.turno === "almuerzo"
                      ? theme.palette.primary.main
                      : "white",
                  color:
                    store.queryParams.turno === "almuerzo"
                      ? "white"
                      : theme.palette.text.primary,
                  fill:
                    store.queryParams.turno === "almuerzo"
                      ? "white"
                      : theme.palette.text.primary,
                }}
                onClick={() => handleChangeTurno("almuerzo")}
              />
            </Box>
            <Box>
              <CustomIconButton
                icon={CubiertosIcon}
                label="Cena"
                height="50px"
                variant="horizontal"
                style={{
                  marginBottom: 4,
                  backgroundColor:
                    store.queryParams.turno === "cena"
                      ? theme.palette.primary.main
                      : "white",
                  color:
                    store.queryParams.turno === "cena"
                      ? "white"
                      : theme.palette.text.primary,
                  fill:
                    store.queryParams.turno === "cena"
                      ? "white"
                      : theme.palette.text.primary,
                }}
                onClick={() => handleChangeTurno("cena")}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Slide>
  )
}
