import { Box, makeStyles } from "@material-ui/core"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import React, { useContext, useState } from "react"
import { ContextAdmin } from "../Admin/ContextAdmin"
import { getMonthName } from "../../utils/date.js"

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

function getNextDay(day) {
  var nextDay = new Date(day)
  nextDay.setDate(day.getDate() + 1)
  return nextDay
}

function getWeek(fromDay) {
  let dates = [fromDay]
  for (let i = 0; i < 6; i++) {
    const date = getNextDay(dates[i])
    dates.push(date)
  }
  return dates
}

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: "0px 3px 6px #E5F0F8",
  },
  itemContainer: {
    backgroundColor: "white",
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderRadius: 4,
    transition: ".3s",
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.primary.main,
      cursor: "pointer",
      transition: ".3s",
    },
  },
  selectedDay: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderRadius: 4,
    color: "white",
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
    transition: ".3s",
  },
}))

const Container = ({ children, ...rest }) => {
  const classes = useStyles()
  return (
    <Box
      height={104}
      display="flex"
      alignItems="center"
      className={classes.itemContainer}
      {...rest}
    >
      {children}
    </Box>
  )
}

const Day = ({ day }) => {
  const classes = useStyles()
  const { context, setContext } = useContext(ContextAdmin)

  const dayString = `${day.getFullYear()}/${day.getMonth()}/${day.getDate()}`
  const selectedDayString = `${context.dayOfWeek.getFullYear()}/${context.dayOfWeek.getMonth()}/${context.dayOfWeek.getDate()}`

  const selected = selectedDayString === dayString

  const handleDayClick = () => {
    setContext({ ...context, dayOfWeek: day })
  }

  return (
    <Box
      height={104}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      className={selected ? classes.selectedDay : classes.itemContainer}
      onClick={handleDayClick}
    >
      <span style={{ marginBottom: 8, fontWeight: 900 }}>
        {" "}
        {DAY_NAMES[day.getDay()]}{" "}
      </span>
      <span> {day.getDate()} </span>
      <span>
        {getMonthName({ monthNumber: day.getMonth(), shortname: true })}{" "}
      </span>
    </Box>
  )
}

export default function DayOfWeekPicker() {
  const classes = useStyles()
  const today = new Date()
  const [week, setWeek] = useState(() => getWeek(today))

  const handlePrevWeekButton = () => {
    // Esto es un lunes
    const firstDay = week[0]
    const nextFirstDay = new Date(firstDay)
    // Retrocedemos al anterior lunes
    nextFirstDay.setDate(firstDay.getDate() - 7)
    const prevWeek = getWeek(nextFirstDay)
    setWeek(prevWeek)
  }

  const handleNextWeekButton = () => {
    // Esto es un domingo:
    const lastDay = week[6]
    const nextFirstDay = new Date(lastDay)
    // Avanzamos al siguiente lunes
    nextFirstDay.setDate(nextFirstDay.getDate() + 1)
    const nextWeek = getWeek(nextFirstDay)
    setWeek(nextWeek)
  }

  return (
    <Box display="flex" className={classes.container}>
      <Container onClick={handlePrevWeekButton}>
        <ArrowBackIosIcon />
      </Container>
      {week.map((day, index) => (
        <Day key={index} day={day} />
      ))}
      <Container onClick={handleNextWeekButton}>
        <ArrowForwardIosIcon />
      </Container>
    </Box>
  )
}
