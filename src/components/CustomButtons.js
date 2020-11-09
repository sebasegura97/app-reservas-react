import { Box, Button, makeStyles } from "@material-ui/core"
import React from "react"
import PropTypes from "prop-types"

const useStyles = makeStyles(theme => ({
  primary: {
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
    },
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 8,
    textTransform: "none",
    boxShadow: "none",
  },
  secondary: {
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
    },
    paddingRight: theme.spacing(6),
    paddingLeft: theme.spacing(6),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 8,
    textTransform: "none",
    boxShadow: "none",
    backgroundColor: "white",
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
    "&:hover": {
      backgroundColor: theme.palette.background.default,
      boxShadow: "none",
    },
  },
  iconButtonContainer: {
    backgroundColor: "white",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #E5F0F8",
    padding: theme.spacing(2),
    borderRadius: 4,
  },
  iconButtonLabel: {},
}))

export function PrimaryButton({ children, ...rest }) {
  const classes = useStyles()
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.primary}
      {...rest}
    >
      {children}
    </Button>
  )
}

export function SecondaryButton({ children, ...rest }) {
  const classes = useStyles()
  return (
    <Button
      variant="outlined"
      color="secondary"
      className={classes.secondary}
      {...rest}
    >
      {children}
    </Button>
  )
}

export function IconButton({
  icon,
  label,
  variant,
  iconHeight,
  iconWidth,
  buttonHeight,
  buttonWidth,
  ...rest
}) {
  const classes = useStyles()
  const direction = variant === "horizontal" ? "row" : "column"
  return (
    <Box
      display="flex"
      flexDirection={direction}
      alignItems="center"
      justifyContent="center"
      height={buttonHeight ? buttonHeight : "auto"}
      width={buttonWidth ? buttonWidth : "auto"}
      className={classes.iconButtonContainer}
      {...rest}
    >
      <Box
        width={iconWidth}
        marginBottom={variant === "vertical" ? 1 : 0}
        height={iconHeight}
      >
        {icon}
      </Box>
      <span className={classes.iconButtonLabel}>{label}</span>
    </Box>
  )
}

IconButton.propTypes = {
  variant: PropTypes.oneOf(["horizontal", "vertical"]),
}

IconButton.defaultProps = {
  variant: "horizontal",
  iconWidth: 18,
  iconHeight: 18,
}
