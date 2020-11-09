import { InputBase, withStyles } from "@material-ui/core"
import React from "react"

const CustomInput = withStyles(theme => ({
  input: {
    borderRadius: 8,
    position: "relative",
    height: "36px",
    backgroundColor: theme.palette.background.default,
    // border: "1px solid #ced4da",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    paddingLeft: 16,
    '&::placeholder': {
      fontWeight: 400,
      color: theme.palette.text.secondary
    },
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: `0 0 0 0.1rem ${theme.palette.primary.dark}`,
    },
  },
}))(InputBase)

export default CustomInput
