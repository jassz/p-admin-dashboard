import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function toaster(position) {
  return (
    <Toaster
        position={position}
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            removeDelay: 1000,
            style: {
            background: '#363636',
            color: '#fff',
            },

            // Default options for specific types
            success: {
            duration: 3000,
            iconTheme: {
                primary: 'green',
                secondary: 'black',
            },
            },
        }}
    />
  )
}
