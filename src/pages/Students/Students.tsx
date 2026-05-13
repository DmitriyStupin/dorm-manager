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

const Students = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      fullName: 'Иванов Иван Иванович',
      room: '101',
      institute: 'ИКИТ',
      livingUntil: '2026-05-08',
      phone: '+7 (999) 123-45-67',
      debt: 0,
    },
    {
      id: 2,
      fullName: 'Петров Петр Сергеевич',
      room: '203',
      institute: 'ПИ',
      livingUntil: '2027-07-31',
      phone: '+7 (999) 234-56-78',
      debt: 0,
    },
    {
      id: 3,
      fullName: 'Сидорова Анна Викторовна',
      room: '305',
      institute: 'ИКИТ',
      livingUntil: '2028-07-31',
      phone: '+7 (999) 345-67-89',
      debt: 4350,
    },
    {
      id: 4,
      fullName: 'Кузнецов Дмитрий Олегович',
      room: '412',
      institute: 'ИКИТ',
      livingUntil: '2026-07-31',
      phone: '+7 (999) 456-78-90',
      debt: 0,
    },
    {
      id: 5,
      fullName: 'Морозова Екатерина Ильинична',
      room: '118',
      institute: 'ИКИТ',
      livingUntil: '2026-08-15',
      phone: '+7 (999) 567-89-01',
      debt: 0,
    },
    {
      id: 6,
      fullName: 'Васильев Артем Николаевич',
      room: '221',
      institute: 'ПИ',
      livingUntil: '2026-07-31',
      phone: '+7 (999) 678-90-12',
      debt: 0,
    },
    {
      id: 7,
      fullName: 'Орлова Мария Денисовна',
      room: '509',
      institute: 'ИУБП',
      livingUntil: '2027-07-31',
      phone: '+7 (999) 789-01-23',
      debt: 0,
    },
    {
      id: 8,
      fullName: 'Федоров Кирилл Андреевич',
      room: '144',
      institute: 'ПИ',
      livingUntil: '2029-07-31',
      phone: '+7 (999) 890-12-34',
      debt: 0,
    },
    {
      id: 9,
      fullName: 'Соколова Виктория Павловна',
      room: '317',
      institute: 'ИУБП',
      livingUntil: '2027-06-30',
      phone: '+7 (999) 901-23-45',
      debt: 4350,
    },
    {
      id: 10,
      fullName: 'Никитин Александр Романович',
      room: '602',
      institute: 'ПИ',
      livingUntil: '2027-07-31',
      phone: '+7 (999) 012-34-56',
      debt: 0,
    },
  ])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
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
          variant={'outlined'}
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
                  <IconButton onClick={handleClear} edge={'end'}>
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
              <TableCell align={'center'}>Действие</TableCell>
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
                  <TableCell align={'center'}>{student.room}</TableCell>
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
                  <TableCell
                    sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}
                  >
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
          rowsPerPageOptions={[5, 10, 25]}
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
