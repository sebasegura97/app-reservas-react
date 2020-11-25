import React from "react"
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
  useTheme,
} from "@material-ui/core/styles"
import InputBase from "@material-ui/core/InputBase"
import InputLabel from "@material-ui/core/InputLabel"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import { green } from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
  },
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  error: {
    border: `2px solid ${theme.palette.error.main}`,
  },
}))

export default function CustomTextField({InputProps, inputProps, rest}) {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <TextField
      inputProps={{
        style: {
          padding: 16,
        },
      }}
      InputProps={{
        classes: { underline: classes.underline, error: classes.error },
        style: {
          borderRadius: 8,
          backgroundColor: theme.palette.background.default,
        },
      }}
      classes={{ root: classes.root }}
      {...rest}
    />
  )
}
