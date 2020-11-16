export function getMonthName({
  shortname = false,
  fullname = true,
  monthNumber,
}) {
  const months_fullname = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
  const months_shortname = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ]
  if (shortname) {
    return months_shortname[monthNumber]
  }
  if (fullname) {
    return months_fullname[monthNumber]
  }
}

export function getDayName({ shortname = false, fullname = true, dayNumber }) {
  const days_fullname = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ]

  const days_shortname = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  if (shortname) {
    return days_shortname[dayNumber]
  }
  if (fullname) {
    return days_fullname[dayNumber]
  }
}
