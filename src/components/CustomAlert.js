import { Box, Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import React from "react"

export default function CustomAlert({ title, body }) {
  const theme = useTheme()
  return (
    <Box style={{ backgroundColor: theme.palette.error.light }} padding={2}>
      <Box display="flex" flexDirection="row" marginBottom={1}>
        <Box
          width={24}
          height={24}
          marginRight={2}
          style={{
            borderRadius: "50%",
            backgroundColor: theme.palette.error.main,
          }}
        />
        <span style={{ fontSize: 16, color: theme.palette.error.main }}>
          {title}
        </span>
      </Box>
      <Typography color="error" variant="body1">
        {body}
      </Typography>
    </Box>
  )
}
