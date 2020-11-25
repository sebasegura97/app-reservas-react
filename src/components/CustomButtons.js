import { Box, Button, makeStyles } from "@material-ui/core"
import PropTypes from "prop-types"
import React from "react"

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
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: "none",
    },
  },
  primarySmall: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
    height: 48,
    borderRadius: 8,
    textTransform: "none",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: "none",
    },
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
      border: `1px solid ${theme.palette.primary.dark}`,
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
    color: theme.palette.primary.dark,
    fill: theme.palette.primary.dark,
    transition: ".3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      boxShadow: "none",
      color: "white",
      fill: "white",
      transition: ".3s",
    },
  },
  
}))

export function PrimaryButton({ children, variant, ...rest }) {
  const classes = useStyles()
  return (
    <Button
      variant="contained"
      color="primary"
      className={variant === "small" ? classes.primarySmall : classes.primary}
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
        {icon({ style: { fill: "inherit" } })}
      </Box>
      {label && (
        <span style={{ marginLeft: variant === "horizontal" ? 8 : 0 }}>
          {label}
        </span>
      )}
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
