import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import Mesas from "../components/Admin/Routes/Mesas.js"
import AdminLayout from "../components/Admin/Layout"

export default function Admin() {
  return (
    <Layout>
      <AdminLayout>
        <Router basepath="/admin">
          <Mesas path="/mesas" />
        </Router>
      </AdminLayout>
    </Layout>
  )
}
