import {
  Box,
  Fade,
  Grid,
  makeStyles,
  MenuItem,
  Popper,
  Select,
  useTheme,
} from "@material-ui/core"
import React, { useState } from "react"
import GroupIcon from "../../../icons/group"
import AddIcon from "../../../icons/add.svg"
import { IconButton } from "../../CustomButtons"
import CustomInput from "../../CustomInput"
import Alergias from "./Alergias"

const useStyles = makeStyles(theme => ({
  comensalLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  alergiasLabel: {
    textAlign: "center",
    marginBottom: 4,
  },
  iconButton: {
    backgroundColor: theme.palette.background.default,
    cursor: "pointer",
    padding: theme.spacing(1.6),
    borderRadius: 8,
    color: theme.palette.primary.main,
    stroke: theme.palette.primary.main,
    transition: ".3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      stroke: "white",
      transition: ".3s",
    },
  },
}))

const Comensal = ({ onChange, comensal }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    togglePopper(e)
  }

  const togglePopper = e => {
    setAnchorEl(anchorEl ? null : e.currentTarget)
  }

  const openPopper = Boolean(anchorEl)

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={2}>
          <Box
            display="flex"
            alignItems="center"
            marginBottom={{ xs: 2, sm: 0 }}
          >
            <Box width={24} height={24}>
              <GroupIcon fill={theme.palette.primary.main} />
            </Box>
            <span className={classes.comensalLabel}>
              {" "}
              {comensal}º Comensal{" "}
            </span>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Select
            input={<CustomInput />}
            defaultValue="A la carta"
            fullWidth
            type="text"
            name="menu"
            placeholder="A la carta"
          >
            <MenuItem value={"A la carta"}>A la carta</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4} sm={2}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingRight={0.5}
            paddingLeft={0.5}
          >
            <span className={classes.alergiasLabel}> Alergias </span>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
              <Box width={12}>
                <GroupIcon fill={theme.palette.primary.main} />{" "}
              </Box>
              <Box width={12} marginLeft={0.5}>
                <GroupIcon fill={theme.palette.primary.main} />{" "}
              </Box>
              <Box width={12} marginLeft={0.5}>
                <GroupIcon fill={theme.palette.primary.main} />{" "}
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={2} sm={1} onClick={handleClick}>
          <Box
            className={classes.iconButton}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AddIcon />
          </Box>
        </Grid>
      </Grid>
      <Popper
        open={openPopper}
        anchorEl={anchorEl}
        transition
        placement="right-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box marginLeft={2}>
              <Alergias handleClose={togglePopper} />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default function Paso3() {
  return (
    <Box
      width={{ xs: "100%", sm: 800 }}
      paddingRight={{ xs: 2, sm: 0 }}
      paddingLeft={{ xs: 2, sm: 0 }}
      margin="auto"
    >
      <Comensal comensal="1" />
    </Box>

    
  )
}
