import { Box } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import PropTypes from "prop-types"
import React, { useState } from "react"
// import Footer from "./Footer"
import Header from "./Header"
import Viewport from "./Viewport"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2063FF",
      light: "#7390B7",
      dark: "#303481"
    },
    secondary: {
      main: "#A10013",
    },
    text: {
      primary: "#303481",
      secondary: "#7390B7",
    },
    background: {
      default: "#F8F7F8",
    },
  },
  typography: {
    allVariants: {
      color: "#303481",
      fontFamily: "Avenir",
    },
  },
})

const TopLayout = ({ children }) => {
  return (
    <>
      <Viewport />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

const Layout = ({ children }) => {
  return <TopLayout>{children}</TopLayout>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
