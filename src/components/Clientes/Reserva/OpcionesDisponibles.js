import { Box, CircularProgress, Typography, useTheme } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useParams } from "@reach/router"
import { format } from "date-fns"
import es from "date-fns/locale/es"
import React, { useContext, useEffect, useState } from "react"
import SwiperCore, { A11y, Scrollbar } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/swiper-bundle.css"
import { get } from "../../../services/httpClient"
import { getDayName } from "../../../utils/date"
import CustomAlert from "../../CustomAlert"
import { PrimaryButton, SecondaryButton } from "../../CustomButtons"
import { ContextReserva } from "./ContextReserva"

// install Swiper components
SwiperCore.use([Scrollbar, A11y])

function getUrl({ cantidadDePersonas, dia, hora, resto }) {
  const fechaseleccionada = `${dia.getDate()}/${
    dia.getMonth() + 1
  }/${dia.getFullYear()}`
  return `cliente/reservas/obtenerhorariosdisponiblessemana.json?resto=${resto}&fechaseleccionada=${fechaseleccionada}&horaseleccionada=${hora}&comensales=${cantidadDePersonas}`
}

const LoadingFeedback = ({ title, description }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" align="center">
        {title}
      </Typography>
      <Typography variant="subtitle1" align="center">
        {" "}
        ´{description}
      </Typography>
      <Box marginTop={4}>
        <CircularProgress size={128} />{" "}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  swiperContainer: {
    "&:hover": {
      cursor: "pointer",
    },
  },

  horario: {
    borderRadius: 8,
    backgroundColor: theme.palette.background.default,
    transition: ".3s",
  },

  horarioSelected: {
    borderRadius: 8,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    transition: ".3s",
  },

  horarioSuggested: {
    borderRadius: 8,
    backgroundColor: theme.palette.grey[800],
    color: "white",
    transition: ".3s",
  },
}))

export default function OpcionesDisponibles({ close }) {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.only("xs"))
  const [opciones, setOpciones] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const { context, setContext, nextStep } = useContext(ContextReserva)
  const { cantidadDePersonas, dia, hora } = context
  const { resto } = useParams()
  const classes = useStyles()

  const handleDateSelect = ({ date, hora }) => {
    const formattedDate = format(date, "dd/MM/yyyy")
    setSelected(`${formattedDate}-${hora}`)
    setContext({ ...context, dia: date, hora })
  }

  const handleNext = () => {
    if (selected) {
      nextStep()
    }
  }

  const handleCancel = () => {
    close()
  }

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
      paddingTop={4}
      paddingLeft={2}
      width={{ xs: "100%", sm: 600 }}
      margin="auto"
    >
      {!loading ? (
        <>
          {opciones.length ? (
            <>
              <Box marginBottom={2}>
                <CustomAlert
                  title="No hay disponibilidad"
                  body="No hay disponibilidad para 4 personas a las 20:00 el día 23/09/2020. Otras fechas compatibles:"
                />
              </Box>
              {opciones.map(opcion => {
                if (opcion.fecha && opcion.horarios && opcion.horarios.length) {
                  const date = new Date(opcion.fecha)
                  const dayOfWeek = getDayName({
                    dayNumber: date.getDay(),
                    shortname: true,
                  })
                  const formattedDate = format(date, "dd/MM/yyyy", {
                    locale: es,
                  })

                  return (
                    <Box
                      key={`dia-${formattedDate}`}
                      marginBottom={2}
                      className={classes.swiperContainer}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{ marginBottom: 8 }}
                      >
                        <strong>{`${dayOfWeek}.`}</strong> {`${formattedDate}`}
                      </Typography>
                      <Swiper
                        spaceBetween={8}
                        slidesPerView={xs ? "auto" : 7}
                        onSwiper={swiper => console.log(swiper)}
                        onSlideChange={() => console.log("slide change")}
                      >
                        {opcion.horarios.map(hora => {
                          const key = `${formattedDate}-${hora}`
                          const isSuggested = context.hora === hora
                          return (
                            <SwiperSlide
                              key={key}
                              onClick={() => handleDateSelect({ date, hora })}
                            >
                              <Box
                                padding={1}
                                display="flex"
                                flexDirection="row"
                                alignContent="center"
                                justifyContent="center"
                                className={
                                  selected === key
                                    ? classes.horarioSelected
                                    : isSuggested
                                    ? classes.horarioSuggested
                                    : classes.horario
                                }
                              >
                                <span style={{ fontSize: 17 }}>{hora}</span>
                              </Box>
                            </SwiperSlide>
                          )
                        })}
                      </Swiper>
                    </Box>
                  )
                }
              })}
              <Box style={{ float: "right" }} marginTop={2} marginBottom={4}>
                <SecondaryButton onClick={handleCancel}>
                  Cancelar
                </SecondaryButton>
                <PrimaryButton
                  style={{ marginLeft: 16 }}
                  disabled={selected !== null ? false : true}
                  onClick={handleNext}
                >
                  Continuar
                </PrimaryButton>
              </Box>
            </>
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
        <LoadingFeedback
          description="Estamos buscando opciones que te puedan interesar"
          title="Aguarde un instante por favor"
        />
      )}
    </Box>
  )
}
