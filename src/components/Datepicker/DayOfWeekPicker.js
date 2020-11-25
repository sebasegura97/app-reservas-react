import { Box, makeStyles } from "@material-ui/core"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import React, { useEffect, useState } from "react"
import { getMonthName } from "../../utils/date.js"
import { format } from "date-fns"
import PropTypes from "prop-types"

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

const ItemContainer = ({ children, variant, ...rest }) => {
  const classes = useStyles()
  return (
    <Box
      height={variant === "small" ? "auto" : 104}
      display="flex"
      alignItems="center"
      paddingRight={variant === "small" ? 1 : 2}
      paddingLeft={variant === "small" ? 1 : 2}
      className={classes.itemContainer}
      {...rest}
    >
      {children}
    </Box>
  )
}

const Day = ({ variant, ...rest }) => {
  if (variant === "normal") {
    return <DayNormal {...rest} />
  }
  if (variant === "small") {
    return <DaySmall {...rest} />
  }
}

const DayNormal = ({ day, selected, onDayClick }) => {
  const classes = useStyles()

  const handleDayClick = () => {
    onDayClick(day)
  }

  return (
    <Box
      height={104}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      paddingRight={2}
      paddingLeft={2}
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

const DaySmall = ({ day, selected, onDayClick }) => {
  const classes = useStyles()

  const handleDayClick = () => {
    onDayClick(day)
  }

  return (
    <Box
      paddingTop={1}
      paddingBottom={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width={60}
      className={selected ? classes.selectedDay : classes.itemContainer}
      onClick={handleDayClick}
    >
      <span style={{ fontSize: 11, whiteSpace: "pre" }}>
        {day.getDate()}{" "}
        {getMonthName({ monthNumber: day.getMonth(), shortname: true })}{" "}
      </span>
      <span style={{ fontWeight: 900 }}> {DAY_NAMES[day.getDay()]} </span>
    </Box>
  )
}

export default function DayOfWeekPicker({ onChangeDay, value, variant }) {
  const classes = useStyles()
  const today = new Date()
  const [week, setWeek] = useState(() => getWeek(today))
  const [selectedDay, setSelectedDay] = useState(today)

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

  const handleDayClick = value => {
    // setSelectedDay(value)
    if (onChangeDay) {
      onChangeDay(value)
    }
  }

  useEffect(() => {
    const newWeek = getWeek(value)
    setWeek(newWeek)
  }, [value])

  return (
    <Box display="flex" className={classes.container}>
      <ItemContainer variant={variant} onClick={handlePrevWeekButton}>
        <ArrowBackIosIcon />
      </ItemContainer>
      {week.map((day, index) => (
        <Day
          variant={variant}
          key={index}
          day={day}
          selected={format(value, "dd/MM/yyyy") === format(day, "dd/MM/yyyy")}
          onDayClick={handleDayClick}
        />
      ))}
      <ItemContainer variant={variant} onClick={handleNextWeekButton}>
        <ArrowForwardIosIcon />
      </ItemContainer>
    </Box>
  )
}

DayOfWeekPicker.propTypes = {
  variant: PropTypes.oneOf(["small", "default"]),
}

DayOfWeekPicker.defaultProps = {
  variant: "default",
}
