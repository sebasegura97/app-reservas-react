import { Box, Grid, IconButton, Paper, Typography } from "@material-ui/core"
import React from "react"
import CloseIcon from "@material-ui/icons/Close"
import CustomCheckbox from "../../CustomCheckbox"

const AlergiaCheckbox = () => {
  return <CustomCheckbox />
}

export default function Alergias({ onChange, handleClose }) {
  return (
    <Paper>
      <Box
        width={300}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingLeft={2}
        paddingRight={2}
      >
        <Typography variant="h6"> Alergias </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container>
        <Grid item xs={6}>
          <Box>
            <Box width={18} height={18}></Box>
            <Typography> Alergia </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
