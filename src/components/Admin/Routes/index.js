import React from "react"
import { Router } from "@reach/router"
import Clientes from "./Clientes"
import Reservas from "./Reservas"
import Info from "./Restaurante/Info"
import Salas from "./Restaurante/Salas"
import Mesas from "./Restaurante/Mesas"
import Horarios from "./Restaurante/Horarios"
import HorariosAlternativos from "./Restaurante/HorariosAlternativos"
import Menus from "./Menus/Menus"
import Platos from "./Menus/Platos"
import Bebidas from "./Menus/Bebidas"
import Alergenos from "./Menus/Alergenos"
import Bajas from "./Empleados/Bajas"
import Tipos from "./Empleados/Tipos"
import ControlHorario from "./Empleados/ControlHorario"
import Acciones from "./Empleados/Acciones"
import Mensajes from "./Mensajes"
import Tareas from "./Tareas"
import Inicio from "./Inicio"

export default function Routes() {
  return (
    <Router basepath="/admin">
      {/* INICIO */}
      <Inicio path="/inicio" />
      {/* CLIENTES */}
      <Clientes path="/clientes" />
      {/* RESERVAS */}
      <Reservas path="reservas" />
      {/* RESTAURANTE */}
      <Info path="/restaurante/info" />
      <Salas path="restaurante/salas" />
      <Mesas path="restaurante/mesas" />
      <Horarios path="restaurante/horarios" />
      <HorariosAlternativos path="restaurante/horarios-alternativos" />
      {/* MENUS */}
      <Menus path="menus" />
      <Platos path="menus/platos" />
      <Bebidas path="menus/bebidas" />
      <Alergenos path="menus/alergenos" />
      {/* EMPLEADOS */}
      <Bajas path="empleados/bajas" />
      <Tipos path="empleados/tipos" />
      <ControlHorario path="empleados/control" />
      <Acciones path="empleados/acciones" />
      {/* MENSAJES */}
      <Mensajes path="mensajes" />
      {/* TAREAS */}
      <Tareas path="tareas" />
    </Router>
  )
}
