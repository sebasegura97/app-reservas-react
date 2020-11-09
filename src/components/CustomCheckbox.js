import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Checkbox from "@material-ui/core/Checkbox"
import {
  Box,
  FormControl,
  FormControlLabel,
  Typography,
} from "@material-ui/core"

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
function StyledCheckbox(props) {
  const classes = useStyles()

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ "aria-label": "decorative checkbox" }}
      {...props}
    />
  )
}

export default function CustomCheckbox({ checkboxProps, label }) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <StyledCheckbox name="checked" props={checkboxProps} />
      <Typography
        variant="body1"
        color="textSecondary"
        style={{ lineHeight: 1, paddingTop: 4 }}
      >
        {" "}
        {label}
      </Typography>
    </Box>
  )
}
