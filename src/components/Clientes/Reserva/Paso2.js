import {
  Box,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Slide,
  Typography,
  useTheme,
} from "@material-ui/core"
import React, { useContext } from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb"
import { PrimaryButton, SecondaryButton } from "../../CustomButtons"
import CustomCheckbox from "../../CustomCheckbox"
import CustomInput from "../../CustomInput"
import { ContextReserva } from "./ContextReserva"
import Info from "./Info"
import parsePhoneNumberFromString from "libphonenumber-js/"

const PREFIXES = ["+54", "+34"]

export default function Paso2() {
  const theme = useTheme()
  const { prevStep, nextStep, openSnackbar, setContext, context } = useContext(
    ContextReserva
  )

  const handleBack = () => {
    prevStep()
  }
  const handleNext = () => {
    const validation = validateInputs()
    if (!validation.ok) {
      openSnackbar({
        severity: "error",
        message: validation.message,
      })
    } else {
      nextStep()
    }
  }

  const handleInputChange = e => {
    setContext({ ...context, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = e => {
    setContext({ ...context, [e.target.name]: e.target.checked })
  }

  const validateInputs = () => {
    const {
      prefijo,
      telefono,
      nombre,
      apellido,
      email,
      repetir_email,
      terminos,
    } = context
    let phone = `${prefijo ? prefijo : ""}${telefono ? telefono : ""}`
    phone = parsePhoneNumberFromString(phone)

    if (!phone) {
      return {
        ok: false,
        message: "Ingrese un número teléfonico valido.",
      }
    }
    if (phone) {
      const validatePhone = phone.isPossible()
      if (!validatePhone) {
        return {
          ok: false,
          message: "Ingrese un número teléfonico valido.",
        }
      }
    }
    if (nombre === "" || !nombre) {
      return {
        ok: false,
        message: "Ingrese su nombre.",
      }
    }
    if (apellido === "" || !apellido) {
      return {
        ok: false,
        message: "Ingrese su apellido.",
      }
    }
    if (email === "" || !email) {
      return {
        ok: false,
        message: "Ingrese su email.",
      }
    }
    if (repetir_email === "" || !repetir_email) {
      return {
        ok: false,
        message: "Ingrese su email nuevamente en el campo repetir email.",
      }
    }
    if (repetir_email !== email) {
      return {
        ok: false,
        message: "Los email's ingresados no coinciden.",
      }
    }
    if (!terminos) {
      return {
        ok: false,
        message: "Debe aceptar los terminos y condiciones para continuar.",
      }
    }

    return {
      ok: true,
    }
  }

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Box
        display="flex"
        height="100%"
        margin="auto"
        justifyContent="center"
        maxWidth="800px"
        flexDirection="column"
        padding={{ xs: 4 }}
      >
        <Box marginBottom={{ xs: 2 }}>
          <CustomBreadcrumb />
        </Box>
        <Grid container spacing={1}>
          {/* Prefijo y telefono */}
          <Grid item xs={4} sm={2}>
            <Select
              input={
                <InputBase
                  style={{
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    position: "relative",
                    height: "100%",
                    backgroundColor: theme.palette.background.default,
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 16,
                    "&:focus": {
                      borderRadius: 8,
                      borderColor: "#80bdff",
                      boxShadow: `0 0 0 0.1rem ${theme.palette.primary.dark}`,
                    },
                  }}
                />
              }
              inputProps={{ onChange: handleInputChange }}
              value={context.prefijo}
              fullWidth
              type="number"
              name="prefijo"
              placeholder="+54"
            >
              {PREFIXES.map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={8} sm={4}>
            <CustomInput
              fullWidth
              type="number"
              name="telefono"
              placeholder="Telefono"
              value={context.telefono}
              onChange={handleInputChange}
              inputProps={{
                style: {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
            />
          </Grid>

          {/* A esto lo saque porque no tiene sentido */}
          {/* <Grid item xs={12} sm={6}>
            <Select
              input={<CustomInput />}
              defaultValue="A la carta"
              fullWidth
              type="number"
              name="orden"
              placeholder="A la carta"
            >
              <MenuItem value={"A la carta"}>A la carta</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <CustomInput
              fullWidth
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={context.nombre}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomInput
              fullWidth
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={context.apellido}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomInput
              fullWidth
              type="text"
              name="email"
              placeholder="Email"
              value={context.email}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomInput
              fullWidth
              type="text"
              name="repetir_email"
              value={context.repetir_email}
              onChange={handleInputChange}
              placeholder="Repetir email"
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <CustomInput
              rows={8}
              multiline
              fullWidth
              style={{ padding: 0 }}
              inputProps={{
                style: { height: "auto", paddingTop: 16 },
              }}
              type="text"
              name="observaciones"
              value={context.observaciones}
              onChange={handleInputChange}
              placeholder="Observaciones"
            />
          </Grid>
        </Grid>

        {/* Info de reserva y checkboxes */}
        <Grid container spacing={3} style={{ marginTop: 4 }}>
          <Grid item xs={12} sm={4}>
            {" "}
            <Info />{" "}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box>
              <CustomCheckbox
                checkboxProps={{
                  value: context.termino,
                  onChange: handleCheckboxChange,
                  name: "mesadiscapacitados",
                }}
                label="Mesa accesible para discapacitados."
              />
            </Box>
            <Box>
              <CustomCheckbox
                checkboxProps={{
                  value: context.termino,
                  onChange: handleCheckboxChange,
                  name: "trona",
                }}
                label="Trona para niños"
              />
            </Box>
            <Box>
              <CustomCheckbox
                checkboxProps={{
                  value: context.termino,
                  onChange: handleCheckboxChange,
                  name: "terminos",
                }}
                label="He leido y acepto los terminos y condiciones"
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          width="100%"
          display="flex"
          marginTop={4}
          justifyContent="flex-end"
          flexWrap="wrap-reverse"
        >
          <SecondaryButton
            variant="contained"
            style={{ marginRight: 8 }}
            onClick={handleBack}
          >
            {" "}
            Atras{" "}
          </SecondaryButton>
          <PrimaryButton onClick={handleNext}> Continuar </PrimaryButton>
        </Box>
      </Box>
    </Slide>
  )
}
