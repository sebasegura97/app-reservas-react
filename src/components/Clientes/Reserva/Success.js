import { Box, Grid, makeStyles, Typography } from "@material-ui/core"
import { navigate } from "gatsby"
import React, { useContext } from "react"
import { PrimaryButton } from "../../CustomButtons"
import CustomInput from "../../CustomInput"
import bgImage from "../../../images/reserva-confirmada.png"
import { ContextReserva } from "./ContextReserva"
import { format } from "date-fns"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  container: {
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
  },
}))

export default function Success() {
  const classes = useStyles()
  const { context } = useContext(ContextReserva)

  const handleClick = () => {
    window.location.reload()
  }

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      className={classes.root}
    >
      <Box
        className={classes.container}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="50vh"
        marginTop="15vh"
        width={{ xs: "100%" }}
      >
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          alignContent="center"
          justifyContent="center"
          width={{ xs: "100%", sm: 400 }}
        >
          <Box marginBottom={2}>
            <Typography variant="h4"> ¡Gracias! </Typography>
            <Typography variant="subtitle2" style={{ fontSize: 16 }}>
              {" "}
              Tu solicitud de reserva está <strong>confirmada.</strong>{" "}
            </Typography>
          </Box>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={3}>
              <span className={classes.label}>Fecha</span>
            </Grid>
            <Grid item xs={9}>
              <CustomInput
                disabled
                fullWidth
                value={format(context.dia, "dd/MM/yyyy")}
              />
            </Grid>
            <Grid item xs={3}>
              <span className={classes.label}>Hora</span>
            </Grid>
            <Grid item xs={9}>
              <CustomInput disabled fullWidth value={context.hora} />
            </Grid>
            <Grid item xs={3}>
              <span className={classes.label}>Personas</span>
            </Grid>
            <Grid item xs={9}>
              <CustomInput
                disabled
                fullWidth
                value={context.cantidadDePersonas}
              />
            </Grid>
          </Grid>
          <Box marginLeft="auto" marginTop={2}>
            <PrimaryButton onClick={handleClick}>
              {" "}
              Pagina principal{" "}
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
