import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import InfoItem from '../InfoItem/InfoItem.tsx'

type RoomDetailsDialogProps = {
  isOpen: boolean
  handleClose: () => void
}

const RoomDetailsDialog = (props: RoomDetailsDialogProps) => {
  const { isOpen, handleClose } = props

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClose}>
      <DialogTitle>Комната 16-49</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
              },
              gap: 3,
            }}
          >
            <InfoItem label={'Этаж'} value={'16'} />
            <InfoItem label={'Вместимость'} value={'2 места'} />
            <InfoItem label={'Занято'} value={'2 из 2 мест'} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Статус
              </Typography>

              <Box>
                <Chip label="занята" color="error" />
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box>
            <Typography variant={'subtitle1'} color={'textSecondary'}>
              Проживающие
            </Typography>
            <List>
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between', p: 0 }}
              >
                  <ListItemText
                    primary={'Ступин Дмитрий Андреевич'}
                    secondary={`ИКИТ · проживает до 08.08.2027 · 89964278036`}
                  />
                <Chip label={'0 ₽'} color={'success'} />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color={'error'}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RoomDetailsDialog
