import { Box, Typography } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import React from "react"

const useStyles = makeStyles(theme => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: 0,
    width: 16,
    height: 16,
    border: `2px solid ${theme.palette.primary.light}`,
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.light,
    // backgroundImage:
    //   "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 14,
      height: 14,
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}))

// Inspired by blueprintjs
function StyledCheckbox({ checkboxProps }) {
  const classes = useStyles()

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ "aria-label": "decorative checkbox" }}
      // onChange={() =>  console.log("mira en styled si llego")}
      {...checkboxProps}
    />
  )
}

export default function CustomCheckbox({
  checkboxProps,
  label,
  labelComponent,
}) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <StyledCheckbox checkboxProps={checkboxProps} />
      {labelComponent && labelComponent}
      {label && <span style={{ fontSize: 16 }}> {label} </span>}
    </Box>
  )
}
