import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export default function ComponentBackdrop({openBackdrop}) {
  return (
     <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 9999 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  )
}
