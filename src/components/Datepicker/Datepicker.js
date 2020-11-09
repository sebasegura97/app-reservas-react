import { Box, IconButton, makeStyles, Typography } from "@material-ui/core"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { getYear } from "date-fns"
import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./datepicker.css"

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

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

const locale = {
  localize: {
    month: n => MONTHS[n],
    day: n => DAYS[n],
  },
  formatLong: {},
}

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

export default function Datepicker() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const classes = useStyles()
  const handleDateChange = date => {
    setSelectedDate(date)
  }

  return (
    <DatePicker
      inline
      value={selectedDate}
      onChange={handleDateChange}
      renderCustomHeader={props => renderHeader({ ...props, classes })}
      calendarClassName="calendar"
      locale={locale}
      // dayClassName={classes.day}
      //   calendarContainer={}
    />
  )
}
