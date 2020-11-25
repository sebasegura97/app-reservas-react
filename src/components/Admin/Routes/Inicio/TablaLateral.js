import { DataTypeProvider, RowDetailState } from "@devexpress/dx-react-grid"
import {
  Grid as DXGrid,
  Table,
  TableColumnResizing,
  TableHeaderRow,
  TableRowDetail,
} from "@devexpress/dx-react-grid-material-ui"
import {
  Accordion,
  TableCell,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import InfoIcon from "@material-ui/icons/Info"
import { format } from "date-fns"
import React, { useContext, useEffect, useState } from "react"
import SvgChupete from "../../../../icons/chupete"
import SvgClock from "../../../../icons/clock"
import SvgDiscapacitados from "../../../../icons/discapacitados"
import SvgGroup from "../../../../icons/group"
import SvgStar from "../../../../icons/star"
import { get } from "../../../../services/httpClient"
import { intoleranciasIconSet } from "../../../Clientes/Reserva/Paso3"
import "../../../grid.css"
import { ContextInicio } from "./ContextInicio"
import EditIcon from "@material-ui/icons/Edit"
import { getColorEstado } from "../../../../utils/colors"

const useStyles = makeStyles(theme => ({
  chip: {
    width: 150,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 14,
    display: "flex",
    // justifyContent: "space-between",
    borderRadius: 32,
    backgroundColor: "#FFCC33",
    fontWeight: "bolder",
    color: "white",
    marginBottom: 4,
    "& span": {
      marginRight: 12,
    },
  },
  intoleranciaIcon: {
    "& :hover": {
      cursor: "pointer",
    },
  },
  MuiAccordionroot: {
    boxShadow: "none",
  },
  MuiAccordionrounded: {
    borderBot: "none",
  },
  estadoCirculo: {
    marginRight: 8,
    width: 8,
    height: 8,
    borderRadius: "100% !important",
    backgroundColor: "red",
  },
}))

const getUrl = ({ queryParams }) => {
  const resto = "cm"
  const { fecha } = queryParams
  const formattedFecha = format(new Date(fecha), "dd/MM/yyyy")

  return `http://reservas.levenant.loc/admin/api/reservaslista.json?resto=${resto}&fecha=${formattedFecha}`
}

export default function TablaLateral() {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.only("md"))
  const classes = useStyles()
  const [columns] = useState([
    {
      name: "hora",
      title: "Hora",
    },
    { name: "cliente", title: "Nombre" },
    { name: "comensales", title: "Pax" },
    { name: "mesa", title: "Mesa" },
    { name: "estado", title: "Estado" },
    { name: "id", title: " " },
  ])

  const [columnWidths, setColumnWidths] = useState([
    { columnName: "hora", width: 70 },
    { columnName: "cliente", width: 130 },
    { columnName: "comensales", width: 40 },
    { columnName: "mesa", width: 80 },
    { columnName: "estado", width: 120 },
    { columnName: "id", width: 40 },
  ])

  const [data, setData] = useState([])
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const { store, dispatch } = useContext(ContextInicio)

  const INTOLERANCIAS_ICONS = intoleranciasIconSet({
    backgroundColor: "transparent",
    iconColor: theme.palette.text.primary,
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "set_loading", payload: true })
      const { queryParams } = store
      const url = getUrl({ queryParams })
      try {
        const result = await get(url)
        console.log(result)
        setData(result.data.reservas)
        if (result.status === 200) {
          dispatch({ type: "set_loading", payload: false })
        }
      } catch (error) {
        dispatch({ type: "set_loading", payload: false })
        console.log(error)
      }
    }
    fetchData()
  }, [store.queryParams])

  const TableRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      style={{
        cursor: "pointer",
      }}
    />
  )

  const HoraDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => (
          <Typography>{format(new Date(row.desde), "HH:mm")}</Typography>
        )}
        {...props}
      />
    )
  }

  const ComensalesDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => (
          <Typography>{row.comensales}</Typography>
        )}
        {...props}
      />
    )
  }
  const ClienteDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => (
          <Typography>
            {" "}
            {`${row.cliente.nombre} ${row.cliente.apellido}`}
          </Typography>
        )}
        {...props}
      />
    )
  }
  const MesaDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => {
          return (
            <Typography>
              {row.mesa && row.mesa.nombre ? row.mesa.nombre : "Sin asignar"}
            </Typography>
          )
        }}
        {...props}
      />
    )
  }

  const EstadoDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => (
          <Box display="flex" alignItems="center">
            <Box
              className={classes.estadoCirculo}
              style={{ backgroundColor: getColorEstado(row.estados[0].nombre) }}
            />
            <Typography>
              {row.estados.length ? row.estados[0].nombre : "Esperando"}{" "}
            </Typography>
          </Box>
        )}
        {...props}
      />
    )
  }

  const ActionsDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => (
          <Box>
            <IconButton
              style={{ color: theme.palette.text.primary }}
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Box>
        )}
        {...props}
      />
    )
  }

  const getIntoleranciaIcon = key => {
    console.log("key", key)
    const element = INTOLERANCIAS_ICONS.filter(icon => icon.name === key)
    console.log("element", element)
    if (element && element[0]) {
      let icon = element[0].icon
      console.log("icon", icon)
      return icon
    }
  }

  const DetailIntolerancias = ({ intolerancias }) => {
    return (
      <Box
        display="flex"
        alignContent="center"
        justifyContent="flex-start"
        alignItems="center"
      >
        {Object.entries(intolerancias).map(([key, value], index) => {
          if (value) {
            const icon = getIntoleranciaIcon(key)
            return (
              <Tooltip title={key}>
                <Box width={22} className={classes.intoleranciaIcon}>
                  {icon}
                </Box>
              </Tooltip>
            )
          }
        })}
      </Box>
    )
  }

  const HeaderWithIcon = ({ icon }) => (
    <TableCell
      style={{
        display: "flex",
        // alignItems: "center",
        placeContent: "flex-start",
        alignItems: "center",
        padding: 0,
        paddingTop: 18,
        paddingBottom: 18,
      }}
    >
      {/* <TableHeaderRow.Cell {...props} /> */}
      <Box
        width={20}
        display="flex"
        alignContent="center"
        justifyContent="center"
      >
        {icon}
      </Box>
    </TableCell>
  )

  const TableHeaderCell = props => {
    const { column } = props
    return column.name === "hora" ? (
      <HeaderWithIcon icon={<SvgClock fill={theme.palette.text.primary} />} />
    ) : column.name === "comensales" ? (
      <HeaderWithIcon icon={<SvgGroup fill={theme.palette.text.primary} />} />
    ) : (
      <TableHeaderRow.Cell {...props} />
    )
  }

  const RowDetail = ({ row }) => {
    return (
      <>
        <Grid container style={{ padding: 12 }}>
          <Grid item sm={8}>
            <Box marginBottom={2}>
              <Typography variant="body1">
                <strong> Observaciones </strong>
              </Typography>
            </Box>
            {row.observaciones.length
              ? row.observaciones.map((observacion, index) => (
                  <Typography variant="body2" key={ImageBitmapRenderingContext}>
                    {observacion}
                  </Typography>
                ))
              : null}
          </Grid>
          <Grid
            item
            sm={4}
            style={{
              borderLeft: `2px solid ${theme.palette.background.default}`,
            }}
          >
            <Grid container>
              <Grid
                item
                sm={12}
                style={{
                  borderBottom: `2px solid ${theme.palette.background.default}`,
                  padding: "4px 16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box width={20} marginRight={1}>
                  <SvgChupete
                    fill={row.trona ? theme.palette.text.primary : "#CDCDCD"}
                  />
                </Box>
                <Box width={24} marginRight={1}>
                  <SvgDiscapacitados
                    fill={
                      row.discapacitados
                        ? theme.palette.text.primary
                        : "#CDCDCD"
                    }
                  />
                </Box>
                <Box width={22}>
                  <SvgStar
                    fill={
                      row.discapacitados
                        ? theme.palette.text.primary
                        : "#CDCDCD"
                    }
                  />
                </Box>
              </Grid>
              <Grid
                item
                sm={12}
                style={{
                  borderBottom: `2px solid ${theme.palette.background.default}`,
                  padding: "4px 16px",
                }}
              >
                <span style={{ marginRight: 16 }}>
                  {row.totalreservas -
                    row.totalreservasausentes -
                    row.totalreservascanceladas}
                </span>
                <span style={{ marginRight: 16 }}>PRESENTADO</span>
              </Grid>
              <Grid
                item
                sm={12}
                style={{
                  borderBottom: `2px solid ${theme.palette.background.default}`,
                  padding: "4px 16px",
                }}
              >
                <span style={{ marginRight: 16 }}>
                  {row.totalreservascanceladas}
                </span>
                <span style={{ marginRight: 16 }}>CANCELADAS</span>
              </Grid>
              <Grid
                item
                sm={12}
                style={{
                  padding: "4px 16px",
                }}
              >
                <span style={{ marginRight: 16 }}>
                  {row.totalreservasausentes}
                </span>
                <span style={{ marginRight: 16 }}>AUSENTE</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item sm={12} style={{ marginTop: 8 }}> */}
        <Accordion
          classes={{
            root: classes.MuiAccordionroot,
            rounded: classes.MuiAccordionrounded,
          }}
        >
          <AccordionSummary
            style={{
              borderRadius: "0 !important",
              borderTopLeftRadius: "0 !important",
              borderTopRightRadius: "0 !important",
              backgroundColor: theme.palette.background.default,
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>Menu / intolerancias / alergias</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={8}>
                <Box marginBottom={2}>
                  <Typography variant="body1">
                    <strong> Comensales </strong>
                  </Typography>
                </Box>
                {Object.entries(row.diners).map(([dinerNumber, dinerData]) => {
                  return (
                    <Box marginBottom={1} key={dinerNumber}>
                      <span style={{ marginRight: 16 }}>{dinerNumber}</span>
                      <span>{dinerData.menu ? dinerData.menu.nombre : ""}</span>
                    </Box>
                  )
                })}
              </Grid>
              <Grid item xs={4}>
                <Box marginBottom={2}>
                  <Typography variant="body1">
                    <strong> Intolerancias </strong>
                  </Typography>
                </Box>
                {Object.entries(row.diners).map(([_, dinerData], index) => {
                  if (dinerData.intolerancias) {
                    return (
                      <DetailIntolerancias
                        key={index}
                        intolerancias={dinerData.intolerancias}
                      />
                    )
                  }
                })}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </>
    )
  }

  return (
    <Box
      id="dx-grid"
      style={{ backgroundColor: "white", height: "100%", overflowY: "auto" }}
    >
      <DXGrid rows={data} columns={columns}>
        <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={value =>
            setExpandedRowIds([value[value.length - 1]])
          }
        />
        <HoraDataProvider for={["hora"]} />
        <ClienteDataProvider for={["cliente"]} />
        <ComensalesDataProvider for={["comensales"]} />
        <MesaDataProvider for={["mesa"]} />
        <EstadoDataProvider for={["estado"]} />
        <ActionsDataProvider for={["id"]} />

        <Table
          messages={{ noData: "No hay reservas" }}
          rowComponent={TableRow}
        />
        {md && (
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
          />
        )}
        <TableHeaderRow cellComponent={TableHeaderCell} />
        <TableRowDetail
          cellComponent={({ children }) => (
            <td
              colspan="8"
              style={{
                backgroundColor: "white",
                width: "100%",
                padding: 0,
              }}
            >
              {children}
            </td>
          )}
          contentComponent={RowDetail}
        />
      </DXGrid>
    </Box>
  )
}
