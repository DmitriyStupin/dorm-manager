import {
  Alert,
  Box,
  Button,
  Chip,
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
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Paper from '@mui/material/Paper'
import * as React from 'react'
import { useState } from 'react'
import StudentFormDialog from '../../components/StudentFormDialog/StudentFormDialog.tsx'
import type { Student, StudentFormData } from '../../types/student.ts'
import { students as mockStudents } from '../../mocks/students.ts'
import { rooms } from '../../mocks/rooms.ts'

const Students = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchItem, setSearchItem] = useState('')
  const [open, setOpen] = useState(false)

  const start = page * rowsPerPage
  const end = start + rowsPerPage

  const filteredStudents = students.filter((student) => {
    return student.fullName.toLowerCase().includes(searchItem.toLowerCase())
  })

  const paginatedStudents = filteredStudents.slice(start, end)

  const handleClickOpen = () => {
    setSelectedStudent(null)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student)
    setOpen(true)
  }

  const handleDeleteStudent = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id))
    if (paginatedStudents.length - 1 === 0) {
      setPage(0)
    }
  }

  const handleSubmitStudent = (data: StudentFormData) => {
    if (selectedStudent) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id
            ? {
                ...student,
                ...data,
              }
            : student,
        ),
      )
    } else {
      const newStudent: Student = {
        id: Date.now(),
        ...data,
        debt: 0,
      }

      setStudents((prev) => [...prev, newStudent])
    }

    handleClose()
  }

  const handleClear = () => {
    setSearchItem('')
  }

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('ru-RU').format(new Date(date))
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
          placeholder={'Поиск студента...'}
          value={searchItem}
          onChange={(event) => {
            setSearchItem(event.target.value)
            setPage(0)
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
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
        />
        <Button
          sx={{
            height: '56px',
            borderRadius: 2,
          }}
          variant={'contained'}
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Добавить студента
        </Button>
        <StudentFormDialog
          open={open}
          handleClose={handleClose}
          onSubmit={handleSubmitStudent}
          student={selectedStudent}
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
              <TableCell>ФИО</TableCell>
              <TableCell align={'center'}>Комната</TableCell>
              <TableCell align={'center'}>Институт</TableCell>
              <TableCell align={'center'}>Проживает до</TableCell>
              <TableCell align={'center'}>Телефон</TableCell>
              <TableCell align={'center'}>Долг</TableCell>
              <TableCell align={'right'}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStudents.length > 0 ? (
              paginatedStudents.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      transitionDuration: '0.2s',
                    },
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell align={'center'}>
                    {rooms.find((room) => room.id === student.roomId)?.number}
                  </TableCell>
                  <TableCell align={'center'}>{student.institute}</TableCell>
                  <TableCell align={'center'}>
                    {formatDate(student.livingUntil)}
                  </TableCell>
                  <TableCell align={'center'}>{student.phone}</TableCell>
                  <TableCell align={'center'}>
                    <Chip
                      label={student.debt + ' ₽'}
                      color={student.debt === 0 ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell align={'right'}>
                    <IconButton onClick={() => handleEditStudent(student)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteStudent(student.id)}>
                      <DeleteIcon color={'error'} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <Alert severity="error">Студент не найден</Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component={'div'}
          count={filteredStudents.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  )
}

export default Students
