import { Box } from "@material-ui/core"
import React from "react"
import DrawerNavigation from "./Drawer"
import Header from "./Header"

export default function Layout({ children }) {
  return (
    <Box width="100vw" height="100vh">
      <Header />
      <DrawerNavigation />
      <Box
        paddingRight="116px"
        height="calc(100% - 116px)"
        paddingTop={3}
        paddingLeft="116px"
        overflow="auto"
      >
        {children}
      </Box>
    </Box>
  )
}
