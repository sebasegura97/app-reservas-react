import {
  Box,
  Grid,
  InputBase,
  MenuItem,
  Popper,
  Select,
  TextField,
  useTheme,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { PrimaryButton } from "../../../CustomButtons"
import CustomInput from "../../../CustomInput"
import { ContextReservas } from "./ContextReservas"
import SearchIcon from "@material-ui/icons/Search"
import { format } from "date-fns"
import { getDayName } from "../../../../utils/date"
import SvgCalendar from "../../../../icons/calendar"
import AddIcon from "@material-ui/icons/Add"
import Datepicker from "../../../Datepicker/Datepicker"
import { get } from "../../../../services/httpClient"

export default function HeaderReservas() {
  const [popperAnchor, setPopperAnchor] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [estados, setEstados] = useState([])
  const { store, dispatch } = useContext(ContextReservas)
  const { queryParams } = store
  const theme = useTheme()

  const handleInputChange = e => {
    console.log("e", e)
    dispatch({
      type: "change_query",
      payload: { name: e.target.name, value: e.target.value },
    })
  }

  const handleDatepickerChange = date => {
    dispatch({
      type: "change_query",
      payload: { name: "fecha", value: date },
    })
    setSelectedDate(date)
    setPopperAnchor(null)
  }

  const handleOpenCalendar = event => {
    setPopperAnchor(popperAnchor ? null : event.currentTarget)
  }

  const handleMostrarTodas = () => {
    dispatch({
      type: "change_query",
      payload: {
        name: "mostrarTodas",
        value: !queryParams.mostrarTodas,
      },
    })
  }
  const handleAddButton = () => {
    dispatch({
      type: "toggle_dialog",
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "set_loading", payload: true })
      const url = "admin/api/obtenerestados.json"
      try {
        const result = await get(url)
        setEstados(result.data.estados)
        if (result.status === 200) {
          dispatch({ type: "set_loading", payload: false })
        }
      } catch (error) {
        dispatch({ type: "set_loading", payload: false })
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="row" alignContent="center">
        <CustomInput
          type="text"
          name="search"
          placeholder="Nombre / Apellido / Teléfono"
          value={queryParams.search}
          onChange={handleInputChange}
          inputProps={{
            style: {
              width: 250,
            },
          }}
        />
        <PrimaryButton variant="small" style={{ marginLeft: 8 }}>
          <SearchIcon fontSize="small" />
          {/* Buscar */}
        </PrimaryButton>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Select
          input={<CustomInput />}
          inputProps={{ onChange: handleInputChange }}
          value={queryParams.estado_id}
          style={{ width: 150, marginRight: 8 }}
          name="estado_id"
        >
          <MenuItem value="">Todos</MenuItem>
          {estados.map(estado => (
            <MenuItem key={estado.id} value={estado.id}>
              {estado.nombre}
            </MenuItem>
          ))}
        </Select>
        <PrimaryButton
          onClick={handleOpenCalendar}
          variant="small"
          style={{
            backgroundColor: "white",
            color: theme.palette.text.primary,
            boxShadow: "-3px 0px 6px 0px #E5F0F8",
            marginRight: 8,
          }}
        >
          <Box display="flex" flexDirection="row" alignContent="center">
            <Box marginRight={1} width={20}>
              <SvgCalendar fill={theme.palette.text.primary} />
            </Box>
            <span>
              <strong>
                {getDayName({
                  shortname: true,
                  dayNumber: queryParams.fecha.getDay(),
                })}
                .{" "}
              </strong>
              {format(queryParams.fecha, "dd/MM/yyyy")}
            </span>
          </Box>
        </PrimaryButton>
        <Popper
          id="popper-calendar"
          open={Boolean(popperAnchor)}
          anchorEl={popperAnchor}
          keepMounted
        >
          <Box
            paddingRight={2}
            paddingLeft={2}
            marginTop={1}
            style={{ backgroundColor: "white", borderRadius: 8 }}
          >
            <Datepicker
              onChange={handleDatepickerChange}
              value={selectedDate}
              fixedHeight
            />
          </Box>
        </Popper>
        <PrimaryButton
          variant="small"
          style={{
            backgroundColor: queryParams.mostrarTodas
              ? theme.palette.primary.main
              : "white",
            color: queryParams.mostrarTodas
              ? "white"
              : theme.palette.text.primary,
            boxShadow: "-3px 0px 6px 0px #E5F0F8",
            marginRight: 8,
          }}
          onClick={handleMostrarTodas}
        >
          Todo
        </PrimaryButton>
        <PrimaryButton onClick={handleAddButton} variant="small">
          <AddIcon fontSize="small" />
        </PrimaryButton>
      </Box>
    </Box>
  )
}
