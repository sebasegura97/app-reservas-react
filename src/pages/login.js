import { Box, Grid, makeStyles, Typography } from "@material-ui/core"
import { navigate } from "gatsby"
import React from "react"
import { PrimaryButton } from "../components/CustomButtons"
import CustomCheckbox from "../components/CustomCheckbox"
import CustomInput from "../components/CustomInput"
import Layout from "../components/Layout"
import bgImage from "../images/login.png"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  formContainer: {
    backgroundColor: "white",
  },
}))

export default function Login() {
  const classes = useStyles()
  const handleLogin = () => {
    console.log("Login")
    navigate("/admin")
  }

  return (
    <Layout>
      <Box height="100vh" className={classes.root}>
        <Box
          className={classes.formContainer}
          display="flex"
          alignItems="center"
          height="100%"
          width={{ xs: "100%", sm: "50vw", md: "40vw", lg: "30vw" }}
          paddingLeft={{ xs: 3, lg: 5 }}
          paddingRight={{ xs: 3, lg: 5 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box marginBottom={3}>
                <Typography variant="h4" style={{ fontWeight: "normal" }}>
                  {" "}
                  Bienvenido/a{" "}
                </Typography>
                <Typography variant="subtitle1">
                  Sistema de reservas - <strong> Casa Montaña </strong>{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {" "}
              <CustomInput
                fullWidth
                type="text"
                name="user"
                placeholder="levenant.admin"
              />{" "}
            </Grid>
            <Grid item xs={12}>
              {" "}
              <CustomInput
                fullWidth
                type="password"
                name="password"
                placeholder="********"
              />{" "}
            </Grid>
            <Grid item xs={12}>
              {" "}
              <CustomCheckbox label="Recuerdame en este equipo" />
            </Grid>
            <Grid item xs={12}>
              <Box style={{ float: "right" }} marginTop={2}>
                <PrimaryButton variant="contained" onClick={handleLogin}>
                  {" "}
                  Iniciar sesión{" "}
                </PrimaryButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  )
}
