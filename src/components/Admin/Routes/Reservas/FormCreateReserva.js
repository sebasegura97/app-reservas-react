import {
  Box,
  Grid,
  InputBase,
  LinearProgress,
  MenuItem,
  Select,
  useTheme,
} from "@material-ui/core"
import parsePhoneNumberFromString from "libphonenumber-js/"
import React, { useContext, useState } from "react"
import SvgCalendar from "../../../../icons/calendar"
import { post } from "../../../../services/httpClient"
import { PrimaryButton, SecondaryButton } from "../../../CustomButtons"
import CustomCheckbox from "../../../CustomCheckbox"
import CustomInput from "../../../CustomInput"
import DayOfWeekPicker from "../../../Datepicker/DayOfWeekPicker"
import { ContextReservas } from "./ContextReservas"

const PREFIXES = ["54", "34"]

export default function FormCreateReserva({ onSubmit }) {
  const theme = useTheme()
  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    prefijo: "",
    telefono: "",
    email: "",
    fecha: new Date(),
    hora: "",
    vip: 0,
    trona: 0,
    discapacitados: 0,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [turno, setTurno] = useState("almuerzo")
  const { store, dispatch } = useContext(ContextReservas)

  const validateInputs = () => {
    const { nombre, apellido, prefijo, telefono, email, fecha, hora } = values
    let phone = `${prefijo ? prefijo : ""}${telefono ? telefono : ""}`
    phone = parsePhoneNumberFromString(phone)

    if (!telefono || telefono === "") {
      setErrors(prevState => ({ ...prevState, telefono: true }))
    }
    if (!prefijo || prefijo === "") {
      setErrors(prevState => ({ ...prevState, prefijo: true }))
    }
    if (phone) {
      const validatePhone = phone.isPossible()
      if (!validatePhone) {
        setErrors(prevState => ({
          ...prevState,
          telefono: true,
          prefijo: true,
        }))
      }
    }
    if (nombre === "" || !nombre) {
      setErrors(prevState => ({ ...prevState, nombre: true }))
    }
    if (apellido === "" || !apellido) {
      setErrors(prevState => ({ ...prevState, apellido: true }))
    }
    if (email === "" || !email) {
      setErrors(prevState => ({ ...prevState, email: true }))
    }
    if (hora === "" || !hora) {
      setErrors(prevState => ({ ...prevState, hora: true }))
    }
    if (nombre && apellido && prefijo && telefono && email) {
      return true
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    // const { form } = store
    const validation = validateInputs()
    let url
    if (validation) {
      url = "http://reservas.levenant.loc/admin/api/crearcliente.json?resto=cm"
      const result = await post(url, {
        ...values,
      })
      console.log(result)
      onSubmit(result)
    }
    setLoading(false)
  }

  const handleInputChange = e => {
    setErrors({ ...errors, [e.target.name]: false })
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = e => {
    setValues({
      ...values,
      name: e.target.name,
      value: e.target.checked ? 1 : 0,
    })
  }

  const handleDayChange = fecha => {
    setValues({ ...values, fecha })
  }

  return (
    <Box>
      {loading && (
        <Box position="absolute" top="0" right={0} left={0}>
          <LinearProgress />
        </Box>
      )}
      <Grid container spacing={1}>
        <Grid item sm={6}>
          <CustomInput
            fullWidth
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={values.nombre}
            error={errors.nombre}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item sm={6}>
          <CustomInput
            fullWidth
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={values.apellido}
            error={Boolean(errors.apellido)}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item sm={2}>
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
            inputProps={{
              onChange: handleInputChange,
            }}
            error={Boolean(errors.prefijo)}
            value={values.prefijo}
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
        <Grid item sm={4}>
          <CustomInput
            error={Boolean(errors.telefono)}
            fullWidth
            type="number"
            name="telefono"
            placeholder="Telefono"
            value={values.telefono}
            onChange={handleInputChange}
            inputProps={{
              style: {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            }}
          />
        </Grid>
        <Grid item sm={6}>
          <CustomInput
            fullWidth
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
            error={errors.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item sm={12}>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box width={32} height={32}>
              <SvgCalendar fill={theme.palette.text.primary} />
            </Box>
            <DayOfWeekPicker
              variant="small"
              value={values.fecha}
              onChangeDay={handleDayChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CustomCheckbox
            checkboxProps={{
              checked: Boolean(values.empresa),
              onChange: handleCheckboxChange,
              name: "empresa",
            }}
            label="Empresa"
          />
          <CustomCheckbox
            checkboxProps={{
              checked: Boolean(values.vip),
              onChange: handleCheckboxChange,
              name: "vip",
            }}
            label="Vip"
          />
        </Grid>
      </Grid>
      <Box style={{ float: "right" }} marginTop={3}>
        <SecondaryButton
          onClick={() => dispatch({ type: "toggle_form" })}
          style={{ marginRight: 8 }}
        >
          {" "}
          Cancelar{" "}
        </SecondaryButton>
        <PrimaryButton onClick={handleSubmit}> Confirmar </PrimaryButton>
      </Box>
    </Box>
  )
}
