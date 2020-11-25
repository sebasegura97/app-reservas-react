import {
  Box,
  Grid,
  InputBase,
  LinearProgress,
  MenuItem,
  Select,
  useTheme,
} from "@material-ui/core"
import React, { useContext, useState } from "react"
import { PrimaryButton, SecondaryButton } from "../../../CustomButtons"
import CustomCheckbox from "../../../CustomCheckbox"
import CustomInput from "../../../CustomInput"
import { ContextClientes } from "./ContextClientes"
import parsePhoneNumberFromString from "libphonenumber-js/"
import { post } from "../../../../services/httpClient"

const PREFIXES = ["54", "34"]

export default function FormCliente({ onSubmit }) {
  const { store, dispatch } = useContext(ContextClientes)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  const validateInputs = () => {
    const { nombre, apellido, prefijo, telefono, email } = store.form.values
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
    if (nombre && apellido && prefijo && telefono && email) {
      return true
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { form } = store
    const validation = validateInputs()
    let url
    if (validation) {
      if (form.editing) {
        url = `http://reservas.levenant.loc/admin/api/editarcliente.json?cliente_id=${form.values.id}`
      } else {
        url =
          "http://reservas.levenant.loc/admin/api/crearcliente.json?resto=cm"
      }
      const body = form.values
      const result = await post(url, {
        ...body,
        vip: body.vip ? "1" : "0",
        empresa: body.empresa ? "1" : "0",
      })
      console.log(result)
      onSubmit(result)
    }
    setLoading(false)
  }

  const handleInputChange = e => {
    setErrors({ ...errors, [e.target.name]: false })
    dispatch({
      type: "handle_input_change",
      payload: { name: e.target.name, value: e.target.value },
    })
  }

  const handleCheckboxChange = e => {
    dispatch({
      type: "handle_input_change",
      payload: { name: e.target.name, value: e.target.checked },
    })
  }

  const { values } = store.form

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
            value={values.observaciones}
            onChange={handleInputChange}
            placeholder="Notas del cliente"
          />
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
