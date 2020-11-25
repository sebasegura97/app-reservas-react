import React, { useContext } from "react"
import { PrimaryButton } from "../../../CustomButtons"
import CustomInput from "../../../CustomInput"
import AddIcon from "@material-ui/icons/Add"
import { ContextClientes } from "./ContextClientes"
import { Box } from "@material-ui/core"

export default function HeaderClientes() {
  const { store, dispatch } = useContext(ContextClientes)
  const { queryParams } = store

  const handleInputChange = e => {
    console.log("e", e)
    dispatch({
      type: "change_query",
      payload: { name: e.target.name, value: e.target.value },
    })
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <CustomInput
        type="text"
        name="search"
        placeholder="Buscar..."
        value={queryParams.search}
        onChange={handleInputChange}
        fullWidth
        style={{ marginRight: 16 }}
      />
      <PrimaryButton
        variant="small"
        onClick={() => dispatch({ type: "toggle_form" })}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <AddIcon fontSize="small" style={{ marginRight: 8 }} />
          <span style={{ marginRight: 8 }}>Nuevo</span>
        </Box>
      </PrimaryButton>
    </Box>
  )
}
