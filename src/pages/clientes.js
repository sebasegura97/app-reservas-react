import { Box, Fade, Paper, Slide } from "@material-ui/core"
import React, { useState } from "react"
import { ContextReserva } from "../components/Clientes/Reserva/ContextReserva"
import Paso1 from "../components/Clientes/Reserva/Paso1"
import Paso2 from "../components/Clientes/Reserva/Paso2"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const ClientesPage = () => {
  const [context, setContext] = useState({
    step: 0,
  })

  const steps = [<Paso1 />, <Paso2 />]

  return (
    <ContextReserva.Provider value={{ context, setContext }}>
      <Layout>
        <Box
          style={{
            background: "white",
          }}
          display="flex"
          alignItems="center"
          paddingBottom={{ xs: 4, sm: 0}}
          component="main"
          minHeight="100vh"
        >
          {steps[context.step]}
        </Box>
      </Layout>
    </ContextReserva.Provider>
  )
}

export default ClientesPage
