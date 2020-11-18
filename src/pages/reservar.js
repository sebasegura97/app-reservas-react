import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { Router } from "@reach/router"
import React, { useState } from "react"
import { ContextReserva } from "../components/Clientes/Reserva/ContextReserva"
import Reservar from "../components/Clientes/Reserva/Reservar"
import Layout from "../components/Layout.js"

const ReservarPage = () => {
  const [context, setContext] = useState({
    step: 0,
    cantidadDePersonas: 0,
    dia: new Date(),
    hora: "",
    prefijo: "",
    telefono: "",
    nombre: "",
    apellido: "",
    email: "",
    repetir_email: "",
    observaciones: "",
  })

  const [snackbar, setSnackbar] = useState({ open: false })

  const nextStep = () => {
    setContext({ ...context, step: context.step + 1 })
  }
  const prevStep = () => {
    setContext({ ...context, step: context.step - 1 })
  }

  const handleOpenSnackbar = ({ message, severity }) => {
    setSnackbar({
      open: true,
      message,
      severity,
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({
      snackbar: {
        open: false,
      },
    })
  }

  return (
    <Layout>
      <ContextReserva.Provider
        value={{
          context,
          setContext,
          nextStep,
          prevStep,
          openSnackbar: handleOpenSnackbar,
        }}
      >
        <Router basepath="/reservar">
          <Reservar path="/:resto" />
        </Router>
      </ContextReserva.Provider>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  )
}

export default ReservarPage
