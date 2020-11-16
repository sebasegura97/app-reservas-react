import React, { useState } from "react"
import { ContextAdmin } from "../components/Admin/ContextAdmin"
import AdminLayout from "../components/Admin/Layout"
import Routes from "../components/Admin/Routes"
import Layout from "../components/Layout"

export default function Admin() {
  const [context, setContext] = useState({
    dayOfWeek: new Date(),
    drawerOpen: false,
  })

  return (
    <Layout>
      <ContextAdmin.Provider value={{ context, setContext }}>
        <AdminLayout>
          {/* <DrawerNavigation /> */}
          <Routes />
        </AdminLayout>
      </ContextAdmin.Provider>
    </Layout>
  )
}
