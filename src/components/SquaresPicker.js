import {
  Box,
  InputLabel,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core"
import React from "react"

const useStyles = makeStyles(theme => ({
  quantityPicker: {
    borderRadius: theme.spacing(1),
    padding: 0,
    height: 48,
    lineHeight: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: ".3s",
    "&:hover": {
      cursor: "pointer",
    },
  },
}))

export default function SquaresPicker({
  value,
  onClick,
  squares,
  label,
  squaresByRow = 6,
}) {
  const theme = useTheme()
  const classes = useStyles()

  const handleClick = quantity => {
    if (onClick) {
      onClick(quantity)
    }
  }

  return (
    <>
      <InputLabel
        style={{ marginBottom: 12, color: theme.palette.primary.dark }}
        id="age-label"
      >
        {label}
      </InputLabel>
      <Box
        display="grid"
        gridGap={8}
        gridAutoFlow="row-dense"
        gridAutoRows="50px"
        gridTemplateColumns={{
          xs: `repeat(${squaresByRow}, 1fr)`,
          sm: `repeat(${squaresByRow}, 1fr)`,
        }}
      >
        {squares.map((quantity, index) => (
          <Box
            key={index}
            onClick={() => handleClick(quantity)}
            className={classes.quantityPicker}
            style={{
              background:
                value === quantity
                  ? theme.palette.primary.main
                  : theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            <Typography
              style={{
                color:
                  value === quantity ? "white" : theme.palette.text.primary,
              }}
            >
              {quantity}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}
