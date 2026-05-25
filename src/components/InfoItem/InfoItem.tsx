import { Box, Typography } from '@mui/material'
import * as React from 'react'

type InfoItemProps = {
  label: string
  value: React.ReactNode
}

const InfoItem = (props: InfoItemProps) => {
  const { label, value } = props

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant={'subtitle1'} color={'textSecondary'}>
        {label}
      </Typography>
      <Typography variant={'body1'} sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  )
}

export default InfoItem
