import {
  Box,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Slide,
  useTheme,
} from "@material-ui/core"
import { useParams } from "@reach/router"
import React, { useContext, useEffect, useState } from "react"
import { get } from "../../../services/httpClient"
import CustomBreadcrumb from "../../CustomBreadcrumb"
import { PrimaryButton } from "../../CustomButtons"
import CustomInput from "../../CustomInput"
import Datepicker from "../../Datepicker/Datepicker"
import SquaresPicker from "../../SquaresPicker"
import { ContextReserva } from "./ContextReserva"
import OpcionesDisponibles from "./OpcionesDisponibles"

function MyTimePicker({ hours, ...rest }) {
  const theme = useTheme()
  const { context } = useContext(ContextReserva)
  const [value, setValue] = useState("")
  const { hora } = context

  useEffect(() => {
    const newValue = hours.includes(hora) ? hora : ""
    setValue(newValue)
  }, [hora, hours])

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
        value={value}
        {...rest}
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

function getHorariosUrl({ dia, resto }) {
  const fecha = `${dia.getDate()}/${dia.getMonth() + 1}/${dia.getFullYear()}`
  const url = `cliente/reservas/obtenerhorariosdisponibles.json?resto=${resto}&fechaseleccionada=${fecha}`
  return url
}

function getVerificacionUrl({ resto, fecha, hora, comensales }) {
  const fechaseleccionada = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`
  const url = `/cliente/reservas/verificareserva.json?resto=${resto}&fechaseleccionada=${fechaseleccionada}&horaseleccionada=${hora}&comensales=${comensales}`
  return url
}

// Componente principal
export default function Paso1() {
  const squares = ["1", "2", "3", "4", "5", "6", "+"]
  const today = new Date()
  const { resto } = useParams()
  const { context, setContext, nextStep, openSnackbar } = useContext(
    ContextReserva
  )
  const [showInputCantidad, setShowInputCantidad] = useState(false)
  const [showAlternativas, setShowAlternativas] = useState(false)
  const [horarios, setHorarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState(() =>
    getHorariosUrl({ dia: context.dia, resto })
  )

  const handleQuantityPicker = cantidadDePersonas => {
    if (cantidadDePersonas === "+") {
      setShowInputCantidad(true)
    } else {
      setContext({ ...context, cantidadDePersonas })
    }
  }

  const showSuccessFeedback = () => {
    openSnackbar({
      severity: "success",
      message: `Se ha encontrado disponibilidad para ${
        context.cantidadDePersonas
      } personas el dia
      ${context.dia.getDate()}/${context.dia.getMonth()}/${context.dia.getFullYear()} a hs ${
        context.hora
      }`,
    })
  }

  const showErrorFeedback = () => {
    openSnackbar({
      severity: "warning",
      message: `No se ha encontrado disponibilidad para ${
        context.cantidadDePersonas
      } personas el dia
      ${context.dia.getDate()}/${context.dia.getMonth()}/${context.dia.getFullYear()} a hs ${
        context.hora
      }`,
    })
  }

  const validateInputs = () => {
    const { dia, hora, cantidadDePersonas } = context
    if (!dia) {
      return {
        ok: false,
        message: "Seleccione un día en el calendario.",
      }
    } else if (hora === "" || !hora) {
      return {
        ok: false,
        message: "Seleccione un horario.",
      }
    } else if (cantidadDePersonas === "" || !cantidadDePersonas) {
      return {
        ok: false,
        message: "Ingrese la cantidad de personas.",
      }
    } else {
      return { ok: true }
    }
  }

  async function verificarReserva() {
    const url = getVerificacionUrl({
      resto,
      fecha: context.dia,
      hora: context.hora,
      comensales: context.cantidadDePersonas,
    })
    try {
      const { data } = await get(url)
      return data.respuesta
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const handleInputChange = e => {
    setContext({ ...context, [e.target.name]: e.target.value })
  }

  const handleDatepickerChange = date => {
    const newUrl = getHorariosUrl({ dia: date, resto })
    setUrl(newUrl)
    setContext({ ...context, dia: date })
  }

  const handleButtonContinuar = async () => {
    const validation = validateInputs()
    if (validation.ok) {
      const response = await verificarReserva()
      if (response === true) {
        showSuccessFeedback()
        nextStep()
      } else {
        setShowAlternativas(true)
        showErrorFeedback()
      }
    } else {
      openSnackbar({
        severity: "error",
        message: validation.message,
      })
    }
  }

  const handleCloseOpcionesDisponibles = () => {
    setShowAlternativas(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await get(url)
      setHorarios(result.data.horarios)
      setLoading(false)
    }
    fetchData()
  }, [url])

  return (
    <>
      {!showAlternativas ? (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <Box maxWidth={{ xs: 300, md: 800 }} margin="auto" paddingTop={4}>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <CustomBreadcrumb />
              </Grid>
              <Grid item xs={12} md={6}>
                <Datepicker
                  onChange={handleDatepickerChange}
                  value={context.dia}
                  minDate={today}
                  fixedHeight
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box marginBottom={2}>
                  <MyTimePicker
                    name="hora"
                    hours={horarios}
                    onChange={handleInputChange}
                  />
                  {loading && <LinearProgress />}
                </Box>
                {!showInputCantidad ? (
                  <SquaresPicker
                    value={context.cantidadDePersonas}
                    onClick={handleQuantityPicker}
                    squares={squares}
                    label={"Cantidad de personas"}
                    squaresByRow={7}
                  />
                ) : (
                  <Slide in={true} direction="left">
                    <CustomInput
                      fullWidth
                      type="text"
                      name="cantidadDePersonas"
                      placeholder="Cantidad de personas"
                      value={context.cantidadDePersonas}
                      onChange={handleInputChange}
                    />
                  </Slide>
                )}
              </Grid>
              <Grid item xs={12}>
                <Box marginTop={4}>
                  <PrimaryButton
                    variant="contained"
                    color="primary"
                    onClick={handleButtonContinuar}
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
      ) : (
        <OpcionesDisponibles close={handleCloseOpcionesDisponibles} />
      )}
    </>
  )
}
