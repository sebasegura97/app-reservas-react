import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core"
import React, { useContext } from "react"
import { PrimaryButton, SecondaryButton } from "../../CustomButtons"
import { ContextReserva } from "./ContextReserva"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import CustomInput from "../../CustomInput"
import Info from "./Info"
import CustomBreadcrumb from "../../CustomBreadcrumb"
import CustomCheckbox from "../../CustomCheckbox"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"

const PREFIXES = ["+54", "+34"]

export default function Paso2() {
  const theme = useTheme()
  const { setContext } = useContext(ContextReserva)
  const handleBack = () => {
    setContext({ step: 0 })
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
        <ValidatorForm>
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
                      // border: "1px solid #ced4da",
                      fontSize: 16,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 16,
                      // Use the system font instead of the default Roboto font.
                      "&:focus": {
                        borderRadius: 8,
                        borderColor: "#80bdff",
                        boxShadow: `0 0 0 0.1rem ${theme.palette.primary.dark}`,
                      },
                    }}
                  />
                }
                defaultValue="+54"
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
                inputProps={{
                  style: {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomInput
                fullWidth
                type="text"
                name="nombre"
                placeholder="Nombre"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomInput
                fullWidth
                type="text"
                name="apellido"
                placeholder="Apellido"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomInput
                fullWidth
                type="text"
                name="email"
                placeholder="Email"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomInput
                fullWidth
                type="text"
                name="repetir_email"
                placeholder="Repetir email"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <CustomInput
                rows={8}
                multiline
                fullWidth
                inputProps={{
                  style: { height: "auto", paddingTop: 16 },
                }}
                type="text"
                name="observaciones"
                placeholder="Observaciones"
              />
            </Grid>
          </Grid>

          {/* Info de reserva y checkboxes */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              {" "}
              <Info />{" "}
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="body1"
                style={{ fontWeight: 600 }}
                color="primary"
              >
                * Si selecciona un menu sera para todos los integrantes de la
                reserva.
              </Typography>
              <Box>
                <CustomCheckbox label="Tiene algun comensal intolerancia o alergia?" />
              </Box>
              <Box>
                <CustomCheckbox label="Mesa accesible para discapacitados." />
              </Box>
              <Box>
                <CustomCheckbox label="Trona para niños" />
              </Box>
              <Box>
                <CustomCheckbox label="He leido y acepto los terminos y condiciones" />
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
            <PrimaryButton onClick={handleBack}> Continuar </PrimaryButton>
          </Box>
        </ValidatorForm>
      </Box>
    </Slide>
  )
}
