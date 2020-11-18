import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core"
import React, { useContext, useReducer, useState } from "react"
import CloseIcon from "@material-ui/icons/Close"
import CustomCheckbox from "../../CustomCheckbox"
import {
  SvgPescado,
  SvgCrustaceos,
  SvgMoluscos,
  SvgGluten,
  SvgHuevos,
  SvgLacteos,
  SvgSoja,
  SvgCacahuates,
  SvgFrutossecos,
  SvgApio,
  SvgMostaza,
  SvgSesamo,
  SvgAltranueces,
  SvgDioxido,
  SvgVegano,
  SvgVegetariano,
} from "../../../icons/alergias/index"
import { ContextReserva } from "./ContextReserva"

export const ALERGIAS = [
  {
    label: "Pescado",
    name: "pescado",
    icon: <SvgPescado />,
  },
  {
    label: "Crustáceos",
    name: "crustaceos",
    icon: <SvgCrustaceos />,
  },
  {
    label: "Moluscos",
    name: "moluscos",
    icon: <SvgMoluscos />,
  },
  {
    label: "Gluten",
    name: "gluten",
    icon: <SvgGluten />,
  },
  {
    label: "Huevos",
    name: "huevos",
    icon: <SvgHuevos />,
  },
  {
    label: "Lácteos",
    name: "lacteos",
    icon: <SvgLacteos />,
  },
  {
    label: "Soja",
    name: "soja",
    icon: <SvgSoja />,
  },
  {
    label: "Cacahuates",
    name: "cacahuates",
    icon: <SvgCacahuates />,
  },
  {
    label: "Frutos Secos",
    name: "frutossecos",
    icon: <SvgFrutossecos />,
  },
  {
    label: "Apio",
    name: "apio",
    icon: <SvgApio />,
  },
  {
    label: "Mostaza",
    name: "mostaza",
    icon: <SvgMostaza />,
  },
  {
    label: "Sésamo",
    name: "sesamo",
    icon: <SvgSesamo />,
  },
  {
    label: "Altra Nueces",
    name: "altranueces",
    icon: <SvgAltranueces />,
  },
  {
    label: "D. de Azufre y sulfitos",
    name: "dioxidodeazufre",
    icon: <SvgDioxido />,
  },
]

export const PREFERENCIAS = [
  {
    label: "Vegano",
    name: "vegano",
    icon: <SvgVegano />,
  },
  {
    label: "Gluten free",
    name: "glutenfree",
    icon: <SvgGluten />,
  },
  {
    label: "Vegetariano",
    name: "vegetariano",
    icon: <SvgVegetariano />,
  },
]

const LabelComponent = ({ label, icon }) => (
  <Box display="flex" flexDirection="row" alignItems="center">
    <Box marginRight={1} width={30} height={30}>
      {icon ? icon : ""}
    </Box>
    <Typography> {label} </Typography>
  </Box>
)

const CheckboxWithIcon = ({ icon, label, checkboxProps }) => {
  return (
    <>
      <CustomCheckbox
        checkboxProps={checkboxProps}
        labelComponent={<LabelComponent icon={icon} label={label} />}
      />
    </>
  )
}

export default function Alergias({ onChange, handleClose, values }) {
  const ALERGIAS_COL_1 = ALERGIAS.slice(0, ALERGIAS.length / 2)
  const ALERGIAS_COL_2 = ALERGIAS.slice(ALERGIAS.length / 2, ALERGIAS.length)
  const PREFERENCIAS_COL_1 = PREFERENCIAS.slice(0, PREFERENCIAS.length / 2 + 1)
  const PREFERENCIAS_COL_2 = PREFERENCIAS.slice(
    PREFERENCIAS.length / 2 + 1,
    PREFERENCIAS.length
  )

  const handleChange = e => {
    onChange(e)
  }

  return (
    <Box
      width={{ xs: "90vw", sm: 450 }}
      style={{ backgroundColor: "white" }}
      padding={2}
    >
      <Box
        display="flex"
        alignItems="center"
        marginBottom={1}
        justifyContent="space-between"
      >
        <Typography variant="h6"> Alergias </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container>
        <Grid item xs={12} sm={6}>
          {ALERGIAS_COL_1.map((item, index) => (
            <Box key={index} marginBottom={1}>
              <CheckboxWithIcon
                icon={item.icon}
                label={item.label}
                checkboxProps={{
                  name: item.name,
                  onChange: handleChange,
                  checked: Boolean(values[item.name]),
                }}
              />
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          {ALERGIAS_COL_2.map((item, index) => (
            <Box key={index} marginBottom={1}>
              <CheckboxWithIcon
                icon={item.icon}
                label={item.label}
                checkboxProps={{
                  name: item.name,
                  onChange: handleChange,
                  checked: Boolean(values[item.name]),
                }}
              />
            </Box>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Box marginTop={1} marginBottom={1}>
            <Divider />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box marginBottom={1}>
            <Typography variant="h6"> Preferencias </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {PREFERENCIAS_COL_1.map((item, index) => (
            <Box key={index} marginBottom={1}>
              <CheckboxWithIcon
                icon={item.icon}
                label={item.label}
                checkboxProps={{
                  name: item.name,
                  onChange: handleChange,
                  checked: Boolean(values[item.name]),
                }}
              />
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          {PREFERENCIAS_COL_2.map((item, index) => (
            <Box key={index} marginBottom={1}>
              <CheckboxWithIcon
                icon={item.icon}
                label={item.label}
                checkboxProps={{
                  name: item.name,
                  onChange: handleChange,
                  checked: Boolean(values[item.name]),
                }}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
