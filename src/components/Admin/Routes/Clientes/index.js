import { Box, Dialog, Typography, LinearProgress } from "@material-ui/core"
import React from "react"
import { ContextClientes } from "./ContextClientes"
import FormCliente from "./FormCliente"
import HeaderClientes from "./HeaderClientes"
import TableClientes from "./TableClientes"

const initialState = {
  queryParams: {
    reset: false,
    search: "",
    page: 0,
    limit: 8,
  },
  form: {
    open: false,
    editing: false,
    values: {
      nombre: "",
      apellido: "",
      prefijo: "",
      telefono: "",
      email: "",
      observaciones: "",
      vip: false,
      empresa: false,
    },
  },
  loading: false,
}

export default function Clientes() {
  function reducer(store, action) {
    if (action.type === "change_query") {
      const { name, value } = action.payload
      let newQuery = store.queryParams
      newQuery = {
        ...newQuery,
        [name]: value,
      }
      return {
        ...store,
        queryParams: newQuery,
      }
    }
    if (action.type === "reset_query") {
      return {
        ...initialState,
        reset: !store.queryParams.reset,
      }
    }
    if (action.type === "toggle_form") {
      return {
        ...store,
        form: { ...store.form, open: !store.form.open },
      }
    }
    if (action.type === "set_form_add") {
      return {
        ...store,
        form: { ...initialState.form, open: !true },
      }
    }
    if (action.type === "set_form_edit") {
      console.log("action.payload", action.payload)
      return {
        ...store,
        form: { editing: true, open: true, values: { ...action.payload } },
      }
    }
    if (action.type === "handle_input_change") {
      const { name, value } = action.payload
      return {
        ...store,
        form: {
          ...store.form,
          values: { ...store.form.values, [name]: value },
        },
      }
    }
    if (action.type === "set_form_blank") {
      return {
        ...store,
        form: { ...initialState.form },
      }
    }
    if (action.type === "set_loading") {
      return {
        ...store,
        loading: action.payload,
      }
    }
  }

  const [store, dispatch] = React.useReducer(reducer, initialState)

  const handleClienteSubmit = result => {
    dispatch({ type: "toggle_form" })
    dispatch({ type: "reset_query" })
  }

  return (
    <ContextClientes.Provider value={{ store, dispatch }}>
      {store.loading && (
        <Box position="fixed" top={0} right={0} left={0}>
          <LinearProgress />
        </Box>
      )}
      <Dialog
        open={store.form.open}
        onClose={() => dispatch({ type: "set_form_add" })}
      >
        <Box padding={3}>
          <Box marginBottom={2}>
            <Typography variant="h5" style={{ fontWeight: "bolder" }}>
              {store.form.editing
                ? `Editar cliente nro. ${store.form.values.id}`
                : "Agegar nuevo cliente"}{" "}
            </Typography>
          </Box>
          <FormCliente onSubmit={handleClienteSubmit} />
        </Box>
      </Dialog>
      <Box marginLeft={10}>
        <HeaderClientes />
      </Box>
      <Box marginTop={3}>
        <TableClientes />
      </Box>
    </ContextClientes.Provider>
  )
}
