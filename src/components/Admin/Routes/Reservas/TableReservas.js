import {
  CustomPaging,
  DataTypeProvider,
  PagingState,
  SortingState,
  RowDetailState,
} from "@devexpress/dx-react-grid"
import {
  Grid as DXGrid,
  PagingPanel,
  Table,
  TableColumnResizing,
  TableHeaderRow,
  TableRowDetail,
} from "@devexpress/dx-react-grid-material-ui"
import {
  Box,
  Collapse,
  Fade,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import InfoIcon from "@material-ui/icons/Info"
import { format } from "date-fns"
import React, { useContext, useEffect, useState } from "react"
import SvgChupete from "../../../../icons/chupete"
import SvgDiscapacitados from "../../../../icons/discapacitados"
import { get } from "../../../../services/httpClient"
import { intoleranciasIconSet } from "../../../Clientes/Reserva/Paso3"
import "../../../grid.css"
import { ContextReservas } from "./ContextReservas"

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
}))

const getUrl = ({ queryParams }) => {
  const resto = "cm"
  const { search, fecha, estado_id, page, limit, mostrarTodas } = queryParams
  const formattedFecha = format(new Date(fecha), "dd/MM/yyyy")

  if (mostrarTodas) {
    // Omitimos la fecha para mostrar todas las reservas para la fecha y la busqueda ingresada
    return `http://reservas.levenant.loc/admin/api/reservaslista.json?resto=${resto}&page=${page}&limit=${limit}&search=${search}&estado_id=${estado_id}`
  }

  return `http://reservas.levenant.loc/admin/api/reservaslista.json?resto=${resto}&search=${search}&fecha=${formattedFecha}&estado_id=${estado_id}&page=${
    page + 1
  }&limit=${limit}`
}

export default function TableReservas() {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.only("md"))
  const classes = useStyles()
  const [columns] = useState([
    { name: "fecha", title: "Fecha" },
    { name: "hora", title: "Hora" },
    { name: "comensales", title: "Pax" },
    { name: "cliente", title: "Cliente" },
    { name: "mesa", title: "Mesa" },
    // { name: "telefono", title: "Telefono" },
    { name: "estado", title: "Estado" },
    { name: "id", title: " " },
  ])

  const [columnWidths, setColumnWidths] = useState([
    { columnName: "fecha", width: 120 },
    { columnName: "hora", width: 100 },
    { columnName: "comensales", width: 60 },
    { columnName: "cliente", width: 220 },
    { columnName: "mesa", width: 120 },
    // { columnName: "telefono", width: 120 },
    { columnName: "estado", width: 120 },
    { columnName: "id", width: 120 },
  ])

  const [totalCount, setTotalCount] = useState(0)
  const [pageSizes] = useState([7, 14, 21])
  const [sortingStateColumnExtensions] = useState([])
  const [sorting, setSorting] = useState([])
  const [data, setData] = useState([])
  const { store, dispatch } = useContext(ContextReservas)
  const [expandedRowIds, setExpandedRowIds] = useState([])

  const changePageSize = value => {
    console.log("updatedCurrentPage", value)
    const totalPages = Math.ceil(totalCount / value)
    console.log("totalCount", totalCount)
    console.log("totalPages", totalPages)
    const updatedCurrentPage = Math.min(store.queryParams.page, totalPages - 1)
    console.log("updatedCurrentPage", updatedCurrentPage)
    dispatch({ type: "change_query", payload: { name: "limit", value } })
    changePage(updatedCurrentPage)
  }

  const changePage = value => {
    dispatch({ type: "change_query", payload: { name: "page", value } })
  }

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
        if (result.status === 200) {
          setTotalCount(result.data.totalcount)
          setData(result.data.reservas)
        } else {
          setTotalCount(0)
          setData([])
        }
        dispatch({ type: "set_loading", payload: false })
      } catch (error) {
        dispatch({ type: "set_loading", payload: false })
        setData([])
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

  const FechaDataProvider = props => {
    console.log("fecha props", props)
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => {
          return (
            <Typography>{format(new Date(row.desde), "dd/MM/yyyy")}</Typography>
          )
        }}
        {...props}
      />
    )
  }
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
  const TelefonoDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => (
          <Typography>
            {" "}
            {`+${row.cliente.prefijo}-${row.cliente.telefono}`}
          </Typography>
        )}
        {...props}
      />
    )
  }
  const EstadoDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => (
          <Typography>
            {" "}
            {row.estados.length ? row.estados[0].nombre : "Esperando"}{" "}
          </Typography>
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
              <DeleteIcon />
            </IconButton>
            <IconButton
              style={{ color: theme.palette.text.primary }}
              size="small"
            >
              <InfoIcon />
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

  const RowDetail = ({ row }) => {
    return (
      <Grid container>
        <Grid item sm={3}>
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
        <Grid item sm={3}>
          <Box marginBottom={2}>
            <Typography variant="body1">
              <strong> Menús </strong>
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
        <Grid item sm={2}>
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
        <Grid item sm={2}>
          <Box
            height="100%"
            justifyContent="center"
            display="flex"
            flexDirection="column"
          >
            <span
              className={classes.chip}
              style={{ backgroundColor: "#FFCC33" }}
            >
              <span> {row.totalreservas}</span>
              <span> Reservas </span>
            </span>
            <span
              className={classes.chip}
              style={{ backgroundColor: "#FF6666" }}
            >
              <span> {row.totalreservascanceladas}</span>
              <span>Canceladas</span>
            </span>
            <span
              className={classes.chip}
              style={{ backgroundColor: "#D8D8D8" }}
            >
              <span>{row.totalreservasausentes} </span>
              <span>Ausente</span>
            </span>
          </Box>
        </Grid>
        <Grid item sm={1}>
          <Box
            display="flex"
            alignItems="center"
            height="100%"
            justifyContent="center"
            alignContent="center"
          >
            <Box width={32} marginRight={2}>
              <SvgChupete
                fill={row.trona ? theme.palette.text.primary : "#CDCDCD"}
              />
            </Box>
            <Box width={36}>
              <SvgDiscapacitados
                fill={
                  row.discapacitados ? theme.palette.text.primary : "#CDCDCD"
                }
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
  }

  return (
    <Box id="dx-grid" style={{ backgroundColor: "white" }}>
      <DXGrid rows={data} columns={columns}>
        <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={value =>
            setExpandedRowIds([value[value.length - 1]])
          }
        />
        <FechaDataProvider for={["fecha"]} />
        <HoraDataProvider for={["hora"]} />
        <ComensalesDataProvider for={["comensales"]} />
        <ClienteDataProvider for={["cliente"]} />
        <MesaDataProvider for={["mesa"]} />
        {/* <TelefonoDataProvider for={["telefono"]} /> */}
        <EstadoDataProvider for={["estado"]} />
        <ActionsDataProvider for={["id"]} />

        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
          columnExtensions={sortingStateColumnExtensions}
        />
        <PagingState
          currentPage={store.queryParams.page}
          onCurrentPageChange={changePage}
          pageSize={store.queryParams.limit}
          onPageSizeChange={changePageSize}
        />
        {/* <CustomPaging totalCount={data ? data.ventas.totalCount : 0} /> */}
        <CustomPaging totalCount={totalCount} />
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
        <TableHeaderRow />
        <PagingPanel
          pageSizes={pageSizes}
          messages={{
            rowsPerPage: "filas",
            info: "{from} al {to} de ({count})",
          }}
        />
        <TableRowDetail contentComponent={RowDetail} />
      </DXGrid>
    </Box>
  )
}
