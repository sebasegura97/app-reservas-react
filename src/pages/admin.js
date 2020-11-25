import { Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { ContextAdmin } from "../components/Admin/ContextAdmin"
import AdminLayout from "../components/Admin/Layout"
import Routes from "../components/Admin/Routes"
import Layout from "../components/Layout"
import { post } from "../services/httpClient"

export default function Admin() {
  const [context, setContext] = useState({
    dayOfWeek: new Date(),
    drawerOpen: false,
    isLoggedIn: false,
    user: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://reservas.levenant.loc/api/usuarios/token.json`
      const body = {
        email: "jhondoe@emilianobodega.com",
        password: "123",
      }
      try {
        const result = await post(url, body)
        if (result.data.success) {
          localStorage.setItem("token", result.data.data.token)
          setContext({
            ...context,
            isLoggedIn: true,
            user: {
              nombre: "Juan",
              apellido: "Martinez",
              rol: "Administrador",
              email: "api@levenant.com",
            },
          })
        } else {
          setContext({ ...context, isLoggedIn: false, user: null })
          localStorage.removeItem("token")
        }
      } catch (error) {
        setContext({ ...context, isLoggedIn: false, user: null })
        localStorage.removeItem("token")
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <ContextAdmin.Provider value={{ context, setContext }}>
        <AdminLayout>
          <Routes />
        </AdminLayout>
      </ContextAdmin.Provider>
    </Layout>
  )
}
