import { Box, Grid } from "@material-ui/core"
import React from "react"
import DrawerNavigation from "./Drawer"
import Header from "./Header"

export default function Layout({ children }) {
  return (
    <Box width="100vw" height="100vh" style={{ backgroundColor: "#FBFCFE" }}>
      <DrawerNavigation />
      <Grid container>
        {/* <Grid item sm={1}> */}
        <Box position="absolute" top={24} left={16}>
          <Header />
        </Box>
        {/* </Grid> */}
        {/* <Grid item sm={11}> */}
        <Box
          paddingTop={4}
          paddingRight={{ xs: 2, lg: 4 }}
          paddingLeft={{ xs: 2, lg: 4 }}
          height="100vh"
          overflow="auto"
        >
          {children}
        </Box>
        {/* </Grid> */}
      </Grid>
    </Box>
  )
}
