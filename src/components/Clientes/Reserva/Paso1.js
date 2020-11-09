import {
  Box,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Slide,
  Typography,
  useTheme,
} from "@material-ui/core"
import "moment/locale/es"
import React, { useContext, useState } from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb"
import { PrimaryButton } from "../../CustomButtons"
import CustomInput from "../../CustomInput"
import Datepicker from "../../Datepicker/Datepicker"
import { ContextReserva } from "./ContextReserva"

const useStyles = makeStyles(theme => ({
  quantityPicker: {
    borderRadius: 8,
    padding: 0,
    // width: 48,
    height: 48,
    lineHeight: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: ".3s",
    "&:hover": {
      cursor: "pointer",
    },
  },
}))

const hours = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
]
const quantities = ["1", "2", "3", "4", "5", "+"]

function MyTimePicker() {
  const theme = useTheme()
  return (
    <>
      <InputLabel
        style={{ marginBottom: 12, color: theme.palette.primary.dark }}
        id="age-label"
      >
        Disponibilidad horaria
      </InputLabel>
      <Select
        variant="filled"
        fullWidth
        labelId="age-label"
        id="demo-simple-select"
        input={<CustomInput />}
        defaultValue="8:30"
      >
        {hours.map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

function MyQuantityPicker({ value, onClick }) {
  //   const [selectedDate, handleDateChange] = useState(new Date())
  const theme = useTheme()
  const classes = useStyles()

  const handleClick = quantity => {
    if (onClick) {
      onClick(quantity)
    }
  }

  return (
    <>
      <InputLabel
        style={{ marginBottom: 12, color: theme.palette.primary.dark }}
        id="age-label"
      >
        Cantidad de personas
      </InputLabel>
      <Box
        display="grid"
        gridGap={8}
        gridAutoFlow="row-dense"
        gridAutoRows="50px"
        gridTemplateColumns={{ xs: "repeat(6, 1fr)", sm: "repeat(6, 1fr)" }}
      >
        {quantities.map((quantity, index) => (
          <Box
            key={index}
            onClick={() => handleClick(quantity)}
            className={classes.quantityPicker}
            style={{
              background:
                value === quantity
                  ? theme.palette.primary.main
                  : theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            <Typography
              style={{
                color:
                  value === quantity ? "white" : theme.palette.text.primary,
              }}
            >
              {quantity}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

function Paso1() {
  const [state, setState] = useState({
    cantidadDePersonas: "5",
    dia: new Date(),
    hora: new Date(),
  })
  const { setContext } = useContext(ContextReserva)

  const handleQuantityPicker = cantidadDePersonas => {
    setState({ ...state, cantidadDePersonas })
  }

  const handleSubmit = () => {
    setContext({ step: 1 })
  }

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Box maxWidth={{ xs: 300, md: 800 }} margin="auto">
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <CustomBreadcrumb />
          </Grid>
          <Grid item xs={12} md={6}>
            <Datepicker />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box marginBottom={2}>
              <MyTimePicker />
            </Box>
            <MyQuantityPicker
              value={state.cantidadDePersonas}
              onClick={handleQuantityPicker}
            />
          </Grid>
          <Grid item xs={12}>
            <Box marginTop={4}>
              <PrimaryButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ float: "right" }}
              >
                {" "}
                Continuar{" "}
              </PrimaryButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Slide>
  )
}

export default Paso1
