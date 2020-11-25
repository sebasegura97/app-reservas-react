import { Box, Dialog, LinearProgress, Typography } from "@material-ui/core"
import React, { useReducer } from "react"
import { ContextReservas } from "./ContextReservas"
import HeaderReservas from "./HeaderReservas"
import { format } from "date-fns"
import TableReservas from "./TableReservas"
import FormCreateReserva from "./FormCreateReserva"

const initialState = {
  queryParams: {
    mostrarTodas: false,
    search: "",
    fecha: new Date(),
    estado_id: "",
    page: 0,
    limit: 7,
    reset: false,
  },
  dialog: false,
  loading: false,
}

export default function Reservas() {
  function reducer(store, action) {
    if (action.type === "reset_query") {
      return {
        ...initialState,
        reset: !store.queryParams.reset,
      }
    }
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
    if (action.type === "set_loading") {
      return {
        ...store,
        loading: action.payload,
      }
    }
    if (action.type === "toggle_dialog") {
      return {
        ...store,
        dialog: !store.dialog,
      }
    }
  }

  const [store, dispatch] = useReducer(reducer, initialState)

  return (
    <ContextReservas.Provider value={{ store, dispatch }}>
      {store.loading && (
        <Box position="fixed" top={0} right={0} left={0}>
          <LinearProgress />
        </Box>
      )}
      <Dialog
        open={store.dialog}
        onClose={() => dispatch({ type: "toggle_dialog" })}
      >
        <Box padding={3}>
          <Box marginBottom={2}>
            <Typography variant="h5" style={{ fontWeight: "bolder" }}>
              Crear reserva
            </Typography>
          </Box>
          <FormCreateReserva />
        </Box>
      </Dialog>
      <Box marginLeft={14}>
        <HeaderReservas />
      </Box>
      <Box marginTop={4} marginBottom={2} height="fill-avaible">
        <Typography variant="h5" style={{ fontWeight: "bolder" }}>
          {store.queryParams.mostrarTodas
            ? "Todas las reservas"
            : `Reservas del  ${format(store.queryParams.fecha, "dd/MM/yyy")}`}
        </Typography>
      </Box>
      <TableReservas />
    </ContextReservas.Provider>
  )
}
