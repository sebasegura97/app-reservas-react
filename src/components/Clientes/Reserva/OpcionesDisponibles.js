import {
  Box,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@material-ui/core"
import { useParams } from "@reach/router"
import React, { useContext, useEffect, useState } from "react"
import { get } from "../../../services/httpClient"
import { getDayName } from "../../../utils/date"
import { format } from "date-fns"
import es from "date-fns/locale/es"
import CustomInput from "../../CustomInput"
import { ContextReserva } from "./ContextReserva"
import { PrimaryButton } from "../../CustomButtons"
import SquaresPicker from "../../SquaresPicker"

function getUrl({ cantidadDePersonas, dia, hora, resto }) {
  const fechaseleccionada = `${dia.getDate()}/${
    dia.getMonth() + 1
  }/${dia.getFullYear()}`
  return `cliente/reservas/obtenerhorariosdisponiblessemana.json?resto=${resto}&fechaseleccionada=${fechaseleccionada}&horaseleccionada=${hora}&comensales=${cantidadDePersonas}`
}

const LoadingFeedback = ({ label }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" align="center">
        {" "}
        Aguarde un instante por favor{" "}
      </Typography>
      <Typography variant="subtitle1" align="center">
        {" "}
        Estamos buscando opciones que te puedan interesar.{" "}
      </Typography>
      <Box marginTop={4}>
        <CircularProgress size={128} />{" "}
      </Box>
    </Box>
  )
}

export default function OpcionesDisponibles({ close }) {
  const theme = useTheme()
  const [opciones, setOpciones] = useState([])
  const [loading, setLoading] = useState(false)
  const { context, setContext } = useContext(ContextReserva)
  const { cantidadDePersonas, dia, hora } = context
  const { resto } = useParams()

  useEffect(() => {
    const url = getUrl({ cantidadDePersonas, dia, hora, resto })
    const fetchData = async () => {
      var existenOpciones = false
      setLoading(true)
      const result = await get(url)
      //  Se tiene que controlar que haya algun horario disponible, porque pueden venir solo fechas sin horarios.
      const { horariosSemana } = result.data
      if (horariosSemana && horariosSemana.length) {
        horariosSemana.forEach(semana => {
          if (semana.horarios && semana.horarios.length) {
            existenOpciones = true
          }
        })
      }
      if (existenOpciones) {
        setOpciones(horariosSemana)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <Box
      paddingRight={2}
      paddingLeft={2}
      width={{ xs: "100%", sm: 800 }}
      margin="auto"
    >
      {!loading ? (
        <>
          {opciones.length ? (
            opciones.map(opcion => {
              if (opcion.fecha && opcion.horarios && opcion.horarios.length) {
                const date = new Date(opcion.fecha)
                const dayOfWeek = getDayName({ dayNumber: date.getDay() })
                const formattedDate = format(date, "dd/MM/yyyy", { locale: es })
                const label = `${dayOfWeek} ${formattedDate}`
                return (
                  <>
                    <SquaresPicker
                      squaresByRow={10}
                      label={label}
                      squares={opcion.horarios}
                    />
                    {/* <InputLabel
                      style={{
                        marginBottom: 12,
                        marginTop: 18,
                        color: theme.palette.primary.dark,
                      }}
                    >
                      <strong>
                        {getDayName({ dayNumber: date.getDay() })}
                      </strong>{" "}
                      {format(date, "dd/MM/yyyy", { locale: es })}
                    </InputLabel>
                    <Select
                      variant="filled"
                      fullWidth
                      input={<CustomInput />}
                      value={context.hora}
                    >
                      {opcion.horarios.map((value, index) => (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select> */}
                  </>
                )
              }
            })
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography align="center" variant="h4">
                {" "}
                Lo sentimos{" "}
              </Typography>
              <Typography align="center" variant="subtitle1">
                No hay lugar disponible en ningun dia ni horario cercano.{" "}
              </Typography>
              <Box marginTop={2}>
                <PrimaryButton onClick={close}>
                  {" "}
                  Elegir otra fecha{" "}
                </PrimaryButton>
              </Box>
            </Box>
          )}
        </>
      ) : (
        <LoadingFeedback />
      )}
    </Box>
  )
}
