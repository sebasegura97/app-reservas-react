import React, { useContext, useEffect } from "react"
import {
  PagingState,
  SortingState,
  DataTypeProvider,
  CustomPaging,
} from "@devexpress/dx-react-grid"
import {
  Grid as DXGrid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableColumnResizing,
} from "@devexpress/dx-react-grid-material-ui"
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import { useState } from "react"
import "../../../grid.css"
import { ContextClientes } from "./ContextClientes"
import { get } from "../../../../services/httpClient"
import StarIcon from "@material-ui/icons/Star"
import SvgEditar from "../../../../icons/editar"

// const data = [
//   {
//     id: 5,
//     restaurante_id: 1,
//     nombre: "Damian",
//     apellido: "Cipriani",
//     email: "damiancipriani1@gmail.com",
//     prefijo: "39",
//     telefono: "02762961",
//     nif: "3211112",
//     direccion_facturacion: null,
//     empresa: null,
//     nombre_fiscal: null,
//     forma_pago: null,
//     tipo_tarjeta: null,
//     num_tarjeta: null,
//     vencimiento_tarjeta: null,
//     codigo_tarjeta: null,
//     vip: 1,
//     observaciones: "prueba",
//     created: "2020-09-10T18:29:10-03:00",
//     modified: "2020-10-14T18:09:20-03:00",
//     deleted: null,
//   },
//   {
//     id: 6,
//     restaurante_id: 1,
//     nombre: "Jose",
//     apellido: "Perez",
//     email: "perez@gmail.com",
//     prefijo: "1",
//     telefono: "2127281500",
//     nif: "12334567",
//     direccion_facturacion: null,
//     empresa: null,
//     nombre_fiscal: null,
//     forma_pago: null,
//     tipo_tarjeta: null,
//     num_tarjeta: null,
//     vencimiento_tarjeta: null,
//     codigo_tarjeta: null,
//     vip: 0,
//     observaciones: "",
//     created: "2020-09-15T08:19:36-03:00",
//     modified: "2020-10-11T11:52:40-03:00",
//     deleted: null,
//   },
//   {
//     id: 7,
//     restaurante_id: 1,
//     nombre: "Damian",
//     apellido: "Cipriani",
//     email: "damiancipriani1@gmail.com",
//     prefijo: "44",
//     telefono: "2076233060",
//     nif: "",
//     direccion_facturacion: null,
//     empresa: null,
//     nombre_fiscal: null,
//     forma_pago: null,
//     tipo_tarjeta: null,
//     num_tarjeta: null,
//     vencimiento_tarjeta: null,
//     codigo_tarjeta: null,
//     vip: 0,
//     observaciones: "",
//     created: "2020-09-17T17:07:12-03:00",
//     modified: "2020-10-01T10:10:59-03:00",
//     deleted: null,
//   },
//   {
//     id: 8,
//     restaurante_id: 1,
//     nombre: "Damian",
//     apellido: "Cipriani",
//     email: "damiancipriani1@gmail.com",
//     prefijo: "34",
//     telefono: "667206109",
//     nif: null,
//     direccion_facturacion: null,
//     empresa: null,
//     nombre_fiscal: null,
//     forma_pago: null,
//     tipo_tarjeta: null,
//     num_tarjeta: null,
//     vencimiento_tarjeta: null,
//     codigo_tarjeta: null,
//     vip: null,
//     observaciones: null,
//     created: "2020-09-17T19:24:39-03:00",
//     modified: "2020-09-17T19:24:39-03:00",
//     deleted: null,
//   },
//   {
//     id: 9,
//     restaurante_id: 1,
//     nombre: "Ivan",
//     apellido: "Brones",
//     email: "ivan@levenant.com",
//     prefijo: "34",
//     telefono: "667206109",
//     nif: null,
//     direccion_facturacion: null,
//     empresa: null,
//     nombre_fiscal: null,
//     forma_pago: null,
//     tipo_tarjeta: null,
//     num_tarjeta: null,
//     vencimiento_tarjeta: null,
//     codigo_tarjeta: null,
//     vip: 1,
//     observaciones: null,
//     created: "2020-09-17T19:34:08-03:00",
//     modified: "2020-09-17T19:34:08-03:00",
//     deleted: null,
//   },
// ]

const getUrl = ({ queryParams }) => {
  const resto = "cm"
  const { search, page, limit } = queryParams
  return `http://reservas.levenant.loc/admin/api/clienteslista.json?resto=${resto}&search=${
    search ? search : ""
  }&page=${page + 1}&limit=${limit}`
}

export default function TableClientes() {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.only("md"))
  const [columns] = useState([
    { name: "telefono", title: "Nº teléfono", width: "450px" },
    { name: "nombre", title: "Nombre" },
    { name: "email", title: "Email" },
    { name: "vip", title: "VIP" },
    { name: "id", title: " " },
  ])

  const [columnWidths, setColumnWidths] = useState([
    { columnName: "telefono", width: 200 },
    { columnName: "nombre", width: 200 },
    { columnName: "email", width: 260 },
    { columnName: "vip", width: 80 },
    { columnName: "id", width: 120 },
  ])

  const [totalCount, setTotalCount] = useState(0)
  const [pageSizes] = useState([8, 16, 24])
  const [sortingStateColumnExtensions] = useState([])
  const [sorting, setSorting] = useState([])
  const [data, setData] = useState([])
  const { store, dispatch } = useContext(ContextClientes)

  const changePageSize = value => {
    const totalPages = Math.ceil(totalCount / value)
    const updatedCurrentPage = Math.min(store.page, totalPages - 1)
    dispatch({ type: "change_query", payload: { name: "limit", value } })
    changePage(updatedCurrentPage)
  }

  const changePage = value => {
    dispatch({ type: "change_query", payload: { name: "page", value } })
  }

  const handleEdit = row => {
    const {
      id,
      nombre,
      apellido,
      prefijo,
      telefono,
      email,
      observaciones,
      vip,
      empresa,
    } = row
    const values = {
      id,
      nombre,
      apellido,
      prefijo,
      telefono,
      email,
      observaciones,
      vip,
      empresa,
    }

    dispatch({ type: "set_form_edit", payload: values })
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "set_loading", payload: true })
      const { queryParams } = store
      const url = getUrl({ queryParams })
      try {
        const result = await get(url)
        console.log(result)
        setTotalCount(result.data.totalcount)
        setData(result.data.clientes)
        if (result.status === 200) {
          dispatch({ type: "set_loading", payload: false })
        } else {
          setData([])
        }
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

  const NombreDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => (
          <Typography style={{ minWidth: 256 }}>
            <strong>
              {row.nombre} {row.apellido}
            </strong>
          </Typography>
        )}
        {...props}
      />
    )
  }

  const TelefonoDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => (
          <Typography>
            <strong>{`+${row.prefijo} `}</strong>
            {`${row.telefono}`}
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
          <Box width={20} onClick={() => handleEdit(row)}>
            <SvgEditar fill={theme.palette.text.primary} />
          </Box>
        )}
        {...props}
      />
    )
  }

  const VipDataProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={({ row }) => (
          <Box>{Boolean(row.vip) ? <StarIcon /> : " "}</Box>
        )}
        {...props}
      />
    )
  }

  return (
    <Box id="dx-grid" style={{ backgroundColor: "white" }}>
      <DXGrid rows={data} columns={columns}>
        {/* <DXGrid rows={rows} columns={columns}> */}
        <TelefonoDataProvider for={["telefono"]} />
        <NombreDataProvider for={["nombre"]} />
        <VipDataProvider for={["vip"]} />
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
          messages={{ noData: "No hay clientes" }}
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
      </DXGrid>
    </Box>
  )
}
