import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import {
  Alert,
  Box,
  Button,
  Chip,
  type ChipProps,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import * as React from 'react'
import { useState } from 'react'
import RequestsFormDialog from '../../components/RequestsFormDialog/RequestsFormDialog.tsx'
import type { Request, RequestFormData } from '../../types/request.ts'
import { requests as mockRequests } from '../../mocks/requests.ts'
import { rooms } from '../../mocks/rooms.ts'

const Requests = () => {
  const [requests, setRequests] = useState<Request[]>(mockRequests)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchItem, setSearchItem] = useState('')
  const [open, setOpen] = useState(false)

  const start = page * rowsPerPage
  const end = start + rowsPerPage

  const filteredRepairRequests = requests.filter((request) => {
    return request.description.toLowerCase().includes(searchItem.toLowerCase())
  })

  const paginatedRepairRequests = filteredRepairRequests.slice(start, end)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClear = () => {
    setSearchItem('')
  }

  const handleClickOpen = () => {
    setSelectedRequest(null)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditRequest = (request: Request) => {
    setSelectedRequest(request)
    setOpen(true)
  }

  const handleDeleteRequest = (id: number) => {
    setRequests((prev) => prev.filter((request) => request.id !== id))
    if (paginatedRepairRequests.length - 1 === 0) {
      setPage(0)
    }
  }

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('ru-RU').format(new Date(date))
  }

  const handleSubmitRequest = (data: RequestFormData) => {
    if (selectedRequest) {
      setRequests((prev) =>
        prev.map((request) =>
          request.id === selectedRequest.id ? { ...request, ...data } : request,
        ),
      )
    } else {
      const newRequest: Request = {
        id: Date.now(),
        ...data,
        status: 'новое',
        createdAt: new Date().toISOString().split('T')[0],
      }

      setRequests((prev) => [...prev, newRequest])
    }

    handleClose()
  }

  const requestStatusColors: Record<string, ChipProps['color']> = {
    новое: 'info',
    'в процессе': 'warning',
    выполнено: 'success',
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          placeholder={'Поиск заявки...'}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position={'start'}>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position={'end'}>
                  <IconButton onClick={handleClear}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          value={searchItem}
          onChange={(event) => {
            setSearchItem(event.target.value)
            setPage(0)
          }}
        />

        <Button
          sx={{
            height: '56px',
            borderRadius: 2,
          }}
          startIcon={<AddIcon />}
          variant={'contained'}
          onClick={handleClickOpen}
        >
          Добавить заявку
        </Button>
        <RequestsFormDialog
          open={open}
          handleClose={handleClose}
          onSubmit={handleSubmitRequest}
          request={selectedRequest}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Номер</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell align={'center'}>Комната</TableCell>
              <TableCell align={'center'}>Дата создания</TableCell>
              <TableCell align={'center'}>Статус</TableCell>
              <TableCell align={'right'}>Действия</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRepairRequests.length > 0 ? (
              paginatedRepairRequests.map((request) => {
                const room = rooms.find((room) => room.id === request.roomId)

                return (
                  <TableRow
                    key={request.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        transitionDuration: '0.2s',
                      },
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>#{request.id}</TableCell>
                    <TableCell>{request.description}</TableCell>
                    <TableCell align={'center'}>{room?.number}</TableCell>
                    <TableCell align={'center'}>
                      {formatDate(request.createdAt)}
                    </TableCell>
                    <TableCell align={'center'}>
                      <Chip
                        label={request.status}
                        color={requestStatusColors[request.status]}
                      />
                    </TableCell>
                    <TableCell align={'right'}>
                      <IconButton onClick={() => handleEditRequest(request)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        <DeleteIcon color={'error'} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <Alert severity="error">Заявка не найдена</Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component={'div'}
          count={requests.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  )
}

export default Requests
