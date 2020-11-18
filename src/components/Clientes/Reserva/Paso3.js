import {
  Box,
  Dialog,
  Fade,
  Grid,
  LinearProgress,
  makeStyles,
  MenuItem,
  Popper,
  Select,
  Typography,
  useTheme,
} from "@material-ui/core"
import React, { useContext, useEffect, useReducer, useState } from "react"
import GroupIcon from "../../../icons/group"
import AddIcon from "../../../icons/add.svg"
import { IconButton, PrimaryButton } from "../../CustomButtons"
import CustomInput from "../../CustomInput"
import Alergias, { ALERGIAS, PREFERENCIAS } from "./Alergias"
import { ContextReserva } from "./ContextReserva"
import {
  SvgPescado,
  SvgCrustaceos,
  SvgMoluscos,
  SvgGluten,
  SvgHuevos,
  SvgLacteos,
  SvgSoja,
  SvgCacahuates,
  SvgFrutossecos,
  SvgApio,
  SvgMostaza,
  SvgSesamo,
  SvgAltranueces,
  SvgDioxido,
  SvgVegano,
  SvgVegetariano,
} from "../../../icons/alergias/index"
import { get, post } from "../../../services/httpClient"
import { useParams } from "@reach/router"
import { format } from "date-fns"

export const ICONS = [
  {
    name: "pescado",
    icon: <SvgPescado backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "crustaceos",
    icon: <SvgCrustaceos backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "moluscos",
    icon: <SvgMoluscos backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "gluten",
    icon: <SvgGluten backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "huevos",
    icon: <SvgHuevos backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "lacteos",
    icon: <SvgLacteos backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "soja",
    icon: <SvgSoja backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "cacahuates",
    icon: <SvgCacahuates backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "frutossecos",
    icon: <SvgFrutossecos backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "apio",
    icon: <SvgApio backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "mostaza",
    icon: <SvgMostaza backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "sesamo",
    icon: <SvgSesamo backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "altranueces",
    icon: <SvgAltranueces backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "dioxidodeazufre",
    icon: <SvgDioxido backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "vegano",
    icon: <SvgVegano backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "glutenfree",
    icon: <SvgGluten backgroundColor="transparent" iconColor="blue" />,
  },
  {
    name: "vegetariano",
    icon: <SvgVegetariano backgroundColor="transparent" iconColor="blue" />,
  },
]

const useStyles = makeStyles(theme => ({
  comensalLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  alergiasLabel: {
    textAlign: "center",
    marginBottom: 4,
  },
  iconButton: {
    backgroundColor: theme.palette.background.default,
    cursor: "pointer",
    padding: theme.spacing(1.6),
    borderRadius: 8,
    color: theme.palette.primary.main,
    stroke: theme.palette.primary.main,
    transition: ".3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      stroke: "white",
      transition: ".3s",
    },
  },
}))

const Comensal = ({
  onChangeAlergia,
  onChangeMenu,
  comensalId,
  comensal,
  menus,
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    togglePopper(e)
  }

  const togglePopper = e => {
    setAnchorEl(anchorEl ? null : e.currentTarget)
  }

  const handleChangeAlergia = e => {
    onChangeAlergia({ comensalId, e })
  }

  const handleChangeMenu = e => {
    onChangeMenu({ comensalId, e })
  }

  const openPopper = Boolean(anchorEl)

  const findIcon = name => {
    const element = ICONS.filter(icon => icon.name === name)
    console.log("element", element)
    if (element && element[0]) {
      let icon = element[0].icon
      return icon
    }
  }

  return (
    <>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={12} sm={2}>
          <Box
            display="flex"
            alignItems="center"
            marginBottom={{ xs: 2, sm: 0 }}
          >
            <Box width={24} height={24}>
              <GroupIcon fill={theme.palette.primary.main} />
            </Box>
            <span className={classes.comensalLabel}>
              {" "}
              {comensalId + 1}º Comensal{" "}
            </span>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Select
            input={<CustomInput />}
            onChange={handleChangeMenu}
            value={comensal.menu ? comensal.menu : ""}
            fullWidth
            type="text"
            name="menu"
            placeholder="A la carta"
          >
            {Object.entries(menus).map(([key, value]) => {
              return (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              )
            })}
            {/* <MenuItem value="Otro">Otro</MenuItem> */}
          </Select>
        </Grid>
        <Grid item xs={4} sm={2}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingRight={0.5}
            paddingLeft={0.5}
          >
            <span className={classes.alergiasLabel}> Alergias </span>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
              {Object.entries(comensal).map(([key, value]) => {
                if (value) {
                  const icon = findIcon(key)
                  if (icon) {
                    return (
                      <Box width={24} key={key} marginLeft={0.5}>
                        {icon}
                      </Box>
                    )
                  }
                }
              })}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={2} sm={1} onClick={handleClick}>
          <Box
            className={classes.iconButton}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AddIcon />
          </Box>
        </Grid>
      </Grid>
      <Popper
        open={openPopper}
        anchorEl={anchorEl}
        transition
        placement="right"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box marginLeft={2}>
              <Alergias
                values={comensal}
                onChange={handleChangeAlergia}
                handleClose={togglePopper}
              />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  )
}

const INTOLERANCIAS = {
  pescado: false,
  crustaceos: false,
  moluscos: false,
  gluten: false,
  huevos: false,
  lacteos: false,
  soja: false,
  cacahuates: false,
  frutossecos: false,
  apio: false,
  mostaza: false,
  sesamo: false,
  altranueces: false,
  dioxidodeazufre: false,
  vegano: false,
  glutenfree: false,
  vegetariano: false,
}

function getConfirmarReservaBody({ resto, mesa, context, comensales }) {
  const automatico = mesa.tipo === "A"
  const {
    mesadiscapacitados,
    trona,
    dia,
    hora,
    cantidadDePersonas,
    nombre,
    apellido,
    email,
    prefijo,
    telefono,
  } = context
  const fechareserva = format(dia, "dd/MM/yyyy")
  let comen = {}
  comensales.forEach((comensal, index) => {
    const menu = comensal.menu ? comensal.menu : ""
    delete comensal.menu
    comen = {
      ...comen,
      [index + 1]: {
        menu,
        intolerancias: {
          ...INTOLERANCIAS,
          ...comensal,
        },
        intoleranciaotra: "",
      },
    }
  })
  const body = {
    automatico,
    resto,
    discapacitados: Boolean(mesadiscapacitados) ? 1 : 0,
    trona: Boolean(trona) ? 1 : 0,
    fechareserva,
    horareserva: hora,
    comensales: cantidadDePersonas,
    mesa_id: mesa.id,
    cliente: {
      nombre,
      apellido,
      email,
      prefijo,
      telefono,
    },
    prescriptor: {
      nombre: "prueba prescriptor",
    },
    comen,
  }
  console.log(body)
  return body
}

export default function Paso3() {
  const { context, openSnackbar, nextStep } = useContext(ContextReserva)
  const [loading, setLoading] = useState(false)
  const [menus, setMenus] = useState({})
  const initialState = new Array(parseInt(context.cantidadDePersonas)).fill({})
  const { resto } = useParams()

  const reducer = (comensales, action) => {
    if (action.type === "toggle_intolerancia") {
      let newArray = comensales
      newArray[action.payload.comensalId] = {
        ...newArray[action.payload.comensalId],
        [action.payload.name]: action.payload.value,
      }
      return [...newArray]
    }
    if (action.type === "set_menu") {
      let newArray = comensales
      newArray[action.payload.comensalId] = {
        ...newArray[action.payload.comensalId],
        menu: action.payload.value,
      }
      return [...newArray]
    }
  }

  const [comensales, dispatch] = useReducer(reducer, initialState)

  const handleChangeAlergia = ({ comensalId, e }) => {
    dispatch({
      type: "toggle_intolerancia",
      payload: { comensalId, name: e.target.name, value: e.target.checked },
    })
  }

  const handleChangeMenu = ({ comensalId, e }) => {
    dispatch({
      type: "set_menu",
      payload: { comensalId, value: e.target.value },
    })
  }

  // Primero tengo que solicitar una mesa para setear el id de la mesa y si es o no automática
  async function buscarMesa() {
    const fechaSeleccionada = format(context.dia, "dd/MM/yyyy")
    const result = await get(
      `/cliente/reservas/obtenermesasinreserva.json?resto=${resto}&fechaseleccionada=${fechaSeleccionada}&horaseleccionada=${context.hora}&comensales=${context.cantidadDePersonas}&mesadiscapacitados=${context.mesadiscapacitados}`
    )
    return result
  }

  // Luego envio la reserva
  async function confirmarReserva(mesa) {
    const body = getConfirmarReservaBody({ resto, mesa, context, comensales })
    const result = await post("/cliente/reservas/reservar.json", body)
    return result
  }

  async function handleNext() {
    setLoading(true)
    try {
      const mesa = await buscarMesa()
      console.log("mesa", mesa)
      if (mesa.status === 200) {
        openSnackbar({
          severity: "success",
          message: "Se ha encontrado mesa disponible.",
        })
        const reserva = await confirmarReserva(mesa.data.mesa)
        if (reserva.status === 200) {
          setLoading(false)
          nextStep()
        }
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    const url = `cliente/reservas/obtenermenus.json?resto=${resto}`
    const fetchData = async () => {
      setLoading(true)
      const result = await get(url)
      console.log(result.data.menus)
      setMenus(result.data.menus)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <>
      {loading && (
        <Box position="absolute" top={0} right={0} left={0}>
          <LinearProgress color="primary" />
        </Box>
      )}
      <Box
        width={{ xs: "100%", sm: 800 }}
        paddingRight={{ xs: 2, sm: 0 }}
        paddingLeft={{ xs: 2, sm: 0 }}
        margin="auto"
      >
        {comensales.map((comensal, index) => (
          <Box key={index} marginBottom={2}>
            <Comensal
              comensalId={index}
              onChangeAlergia={handleChangeAlergia}
              onChangeMenu={handleChangeMenu}
              comensal={comensal}
              menus={menus}
            />
          </Box>
        ))}
        <Box display="block" float="right">
          <PrimaryButton style={{ float: "right" }} onClick={handleNext}>
            {" "}
            Continuar{" "}
          </PrimaryButton>
        </Box>
      </Box>
    </>
  )
}
