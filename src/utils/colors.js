export function getColorEstado(estado) {
  switch (estado) {
    case "presente":
      return "#66CC99"
    case "reservada":
      return "#FFCC33"
    case "finalizada":
      return "#D8D8D8"
    case "cancelado":
      return "#FF6666"
    case "solapada":
      return "#D8D8D8"
    default:
      return "#FF6666"
  }
}
