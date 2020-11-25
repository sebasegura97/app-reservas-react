import { Box, makeStyles, Typography, useTheme } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { get } from "../../../../services/httpClient"
import { ContextInicio } from "./ContextInicio"
import { format } from "date-fns"
import TEST_DATA from "./TEST_DATA.json"
import { getColorEstado } from "../../../../utils/colors"

const getUrl = ({ queryParams }) => {
  const resto = "cm"
  const { fecha, turno } = queryParams
  const formattedFecha = format(new Date(fecha), "dd-MM-yyyy")
  let turnoDesde = turno === "almuerzo" ? "06:00" : "16:00"
  let turnoHasta = turno === "almuerzo" ? "15:59" : "23:59"

  return `http://reservas.levenant.loc/admin/api/reservasmesas.json?resto=${resto}&servicio_desde=${formattedFecha}${turnoDesde}&servicio_hasta=${formattedFecha}${turnoHasta}`
}

const useStyles = makeStyles(theme => ({
  mesaRedonda: {
    backgroundColor: "white",
    paddingTop: 4,
    borderRadius: "100%",
    position: "absolute",
  },
  mesaCuadrada: {
    backgroundColor: "white",
    paddingTop: 4,
    borderRadius: 8,
    position: "absolute",
  },
  mesaOvalada: {
    backgroundColor: "white",
    paddingTop: 4,
    borderRadius: "50%",
    position: "absolute",
  },
  reserva: {
    width: "80%",
    margin: "auto",
    marginBottom: 4,
    height: 25,
    backgroundColor: theme.palette.background.default,
  },
}))

const Reserva = ({ reserva }) => {
  const classes = useStyles()
  const theme = useTheme()
  const estado = reserva.estados[0] ? reserva.estados[0].nombre : null
  console.log("estado", estado)
  const backgroundColor = estado
    ? getColorEstado(estado)
    : theme.palette.background.default
  return (
    <Box
      className={classes.reserva}
      style={{
        backgroundColor,
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <span style={{ marginRight: 4 }}>
        {" "}
        {format(new Date(reserva.desde), "HH:mm")}{" "}
      </span>
      <span> {reserva.comensales}p </span>
    </Box>
  )
}

const Mesa = ({
  forma,
  nombre,
  x_distancia,
  y_distancia,
  width,
  height,
  reservas,
  plazas_min,
  plazas_max,
}) => {
  const classes = useStyles()
  const reservasContainerHeight =
    forma === "redonda"
      ? `calc(${height}px - 60px)`
      : `calc(${height}px - 40px)`
  return (
    <Box
      className={
        forma === "redonda"
          ? classes.mesaRedonda
          : forma === "ovalada"
          ? classes.mesaOvalada
          : classes.mesaCuadrada
      }
      style={{ top: y_distancia, left: x_distancia, width, height }}
    >
      <Typography
        align="center"
        style={{ lineHeight: 1.1, fontSize: 14 }}
        variant="subtitle1"
      >
        {nombre}
      </Typography>
      <Typography
        align="center"
        style={{ lineHeight: 1.1, fontSize: 12 }}
        variant="subtitle1"
      >
        {plazas_min} - {plazas_max}
      </Typography>
      <Box height={reservasContainerHeight}>
        {reservas.map((item, index) => (
          <Reserva key={index} reserva={item} />
        ))}
      </Box>
    </Box>
  )
}

export default function Mesas() {
  const { store, dispatch } = useContext(ContextInicio)
  const [mesas, setMesas] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "set_loading", payload: true })
      const { queryParams } = store
      const url = getUrl({ queryParams })
      try {
        const result = await get(url)
        console.log(result)
        setMesas(result.data.mesas)
        if (result.status === 200) {
          dispatch({ type: "set_loading", payload: false })
        }
      } catch (error) {
        dispatch({ type: "set_loading", payload: false })
        console.log(error)
      }
    }
    fetchData()
  }, [store.queryParams])

  return (
    <Box
      width={660}
      margin="auto"
      height={580}
      position="relative"
      // style={{ backgroundColor: "grey" }}
    >
      {mesas.map(mesa => {
        return <Mesa key={mesa.id} {...mesa} />
      })}
    </Box>
  )
}
