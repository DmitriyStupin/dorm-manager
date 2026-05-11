import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import * as React from "react";

type StatCardProps = {
  title: string;
  icon: React.ReactNode;
  value: number;
}

const StatCard = (props: StatCardProps) => {
  const {title, icon, value} = props

  return (
    <Card variant={'outlined'} key={title} sx={{ borderRadius: 2 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box
          sx={{
            backgroundColor: 'rgba(25, 118, 210, 0.32)',
            width: 44,
            height: 44,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant={'h5'}>{value}</Typography>
        <Typography variant={'subtitle2'}>{title}</Typography>
      </CardContent>
    </Card>
  )
};

export default StatCard;