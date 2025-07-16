import { Box, Paper, Typography } from '@mui/material'
import ButtonComponent from 'components/button'
import React from 'react'

export default function DeleteSection(handleSubmit) {
  return (
    <Paper
          sx={{
            borderRadius: 4,
            border: "1px solid tertiary.main",
            boxShadow: 5,
            padding: 3,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="body2"
                color="error"
                fontWeight="bold"
                sx={{ textTransform: "uppercase" }}
              >
                Delete Account
              </Typography>
              <Typography
                variant="caption"
                color="secondary.main"
                fontWeight="light"
              >
                Permanently delete your account and all of yur content
              </Typography>
            </Box>

            <ButtonComponent
              value="contained"
              callback={handleSubmit}
              color="error"
              text="Delete Account"
            />
          </Box>
        </Paper>
  )
}
