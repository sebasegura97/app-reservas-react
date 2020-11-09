import { Box, Breadcrumbs, Typography, useTheme } from "@material-ui/core"
import React from "react"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"

export default function CustomBreadcrumb({ containerClass, containerStyle }) {
  const theme = useTheme()
  return (
    <Box
      marginBottom={{ xs: 1, sm: 4 }}
      style={containerStyle}
      className={containerClass}
    >
      <Breadcrumbs
        separator={
          <ArrowForwardIosIcon
            style={{
              fontSize: 12,
              marginBottom: 2,
              color: theme.palette.text.primary,
            }}
          />
        }
        aria-label="breadcrumb"
      >
        <Typography
          variant="body1"
          style={{ fontWeight: 400 }}
          color="textPrimary"
        >
          Nueva solicitud
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          style={{ fontWeight: "bolder" }}
        >
          Casa montaña
        </Typography>
      </Breadcrumbs>
    </Box>
  )
}

CustomBreadcrumb.defaultProps = {
  style: {},
}
