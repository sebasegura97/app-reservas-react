import { Box } from "@material-ui/core"
import React, { useContext } from "react"
import { ContextReserva } from "./ContextReserva"
import Paso1 from "./Paso1"
import Paso2 from "./Paso2"
import Paso3 from "./Paso3"

export default function Reservar() {
  const steps = [<Paso1 />, <Paso2 />, <Paso3 />]
  const { context } = useContext(ContextReserva)

  return (
    <>
      <Box
        style={{
          background: "white",
        }}
        display="flex"
        alignItems="center"
        paddingBottom={{ xs: 4, sm: 0 }}
        component="main"
        minHeight="100vh"
      >
        {steps[context.step]}
      </Box>
    </>
  )
}
