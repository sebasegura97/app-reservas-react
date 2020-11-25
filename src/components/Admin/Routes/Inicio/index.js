import { Box, LinearProgress } from "@material-ui/core"
import React, { useReducer } from "react"
import { ContextInicio } from "./ContextInicio"
import HeaderInicio from "./HeaderInicio"
import Mesas from "./Mesas"
import TablaLateral from "./TablaLateral"

const initialState = {
  queryParams: {
    fecha: new Date(),
    turno: "almuerzo", // almuerzo o cena
  },
  loading: false,
  mostrarTabla: false,
}

export default function Inicio() {
  function reducer(store, action) {
    if (action.type === "change_query") {
      const { name, value } = action.payload
      let newQuery = store.queryParams
      newQuery = {
        ...newQuery,
        [name]: value,
      }
      return {
        ...store,
        queryParams: newQuery,
      }
    }
    if (action.type === "set_loading") {
      return {
        ...store,
        loading: action.payload,
      }
    }
    if (action.type === "toggle_table") {
      return {
        ...store,
        mostrarTabla: !store.mostrarTabla,
      }
    }
  }

  const [store, dispatch] = useReducer(reducer, initialState)

  return (
    <ContextInicio.Provider value={{ store, dispatch }}>
      {store.loading && (
        <Box position="fixed" top={0} right={0} left={0}>
          <LinearProgress />
        </Box>
      )}
      <HeaderInicio />
      <Box
        marginTop={"120px"}
        display="flex"
        width="97vw"
        height="calc(100vh - 180px)"
        alignItems="center"
        justifyContent="center"
      >
        <Mesas />
        {store.mostrarTabla && (
          <Box
            width={{ md: 800 }}
            height="calc(100vh - 180px)"
            zIndex={100}
            // style={{ backgroundColor: "tomato" }}
          >
            <TablaLateral />
          </Box>
        )}
      </Box>
    </ContextInicio.Provider>
  )
}
