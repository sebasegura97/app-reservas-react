import { Box, IconButton, makeStyles, Typography } from "@material-ui/core"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { getYear } from "date-fns"
import React from "react"
import "react-datepicker/dist/react-datepicker.css"
import "./datepicker.css"
import DatePicker, { registerLocale } from "react-datepicker"
import es from "date-fns/locale/es" // the locale you want
registerLocale("es", es) // register it with the name you want

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

const useStyles = makeStyles(theme => ({
  headerDate: {
    color: theme.palette.primary.main,
    lineHeight: 1,
    fontWeight: 600,
  },
  calendar: {
    backgroundColor: "transparent",
    border: "none",
  },
  day: {
    width: "100%",
  },
}))

const renderHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  classes,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      // marginLeft="18px"
      marginBottom={1}
    >
      <Typography className={classes.headerDate} variant="h6">
        {" "}
        {MONTHS[date.getMonth()]} {getYear(date)}{" "}
      </Typography>
      <Box>
        <IconButton disabled={prevMonthButtonDisabled} onClick={decreaseMonth}>
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <IconButton disabled={nextMonthButtonDisabled} onClick={increaseMonth}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default function Datepicker(props) {
  const classes = useStyles()

  return (
    <DatePicker
      inline
      renderCustomHeader={props => renderHeader({ ...props, classes })}
      calendarClassName="calendar"
      locale="es"
      {...props}
    />
  )
}
