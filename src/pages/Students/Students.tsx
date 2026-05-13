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
      course: '2',
      phone: '+7 (999) 123-45-67',
      status: 'Проживает',
    },
    {
      id: 2,
      fullName: 'Петров Петр Сергеевич',
      room: '203',
      institute: 'ПИ',
      course: '3',
      phone: '+7 (999) 234-56-78',
      status: 'Проживает',
    },
    {
      id: 3,
      fullName: 'Сидорова Анна Викторовна',
      room: '305',
      institute: 'ИКИТ',
      course: '1',
      phone: '+7 (999) 345-67-89',
      status: 'Выселен',
    },
    {
      id: 4,
      fullName: 'Кузнецов Дмитрий Олегович',
      room: '412',
      institute: 'ИКИТ',
      course: '4',
      phone: '+7 (999) 456-78-90',
      status: 'Проживает',
    },
    {
      id: 5,
      fullName: 'Морозова Екатерина Ильинична',
      room: '118',
      institute: 'ИКИТ',
      course: '2',
      phone: '+7 (999) 567-89-01',
      status: 'Проживает',
    },
    {
      id: 6,
      fullName: 'Васильев Артем Николаевич',
      room: '221',
      institute: 'ПИ',
      course: '5',
      phone: '+7 (999) 678-90-12',
      status: 'Проживает',
    },
    {
      id: 7,
      fullName: 'Орлова Мария Денисовна',
      room: '509',
      institute: 'ИУБП',
      course: '3',
      phone: '+7 (999) 789-01-23',
      status: 'Проживает',
    },
    {
      id: 8,
      fullName: 'Федоров Кирилл Андреевич',
      room: '144',
      institute: 'ПИ',
      course: '1',
      phone: '+7 (999) 890-12-34',
      status: 'Проживает',
    },
    {
      id: 9,
      fullName: 'Соколова Виктория Павловна',
      room: '317',
      institute: 'ИУБП',
      course: '2',
      phone: '+7 (999) 901-23-45',
      status: 'Выселен',
    },
    {
      id: 10,
      fullName: 'Никитин Александр Романович',
      room: '602',
      institute: 'ПИ',
      course: '4',
      phone: '+7 (999) 012-34-56',
      status: 'Проживает',
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
        status: 'Проживает',
      }

      setStudents((prev) => [...prev, newStudent])
    }

    handleClose()
  }

  const handleClear = () => {
    setSearchItem('')
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
              <TableCell align={'right'}>Комната</TableCell>
              <TableCell align={'right'}>Институт</TableCell>
              <TableCell align={'right'}>Курс</TableCell>
              <TableCell align={'right'}>Телефон</TableCell>
              <TableCell align={'right'}>Статус</TableCell>
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
                  <TableCell align={'right'}>{student.room}</TableCell>
                  <TableCell align={'right'}>{student.institute}</TableCell>
                  <TableCell align={'right'}>{student.course}</TableCell>
                  <TableCell align={'right'}>{student.phone}</TableCell>
                  <TableCell align={'right'}>
                    <Chip
                      label={student.status}
                      color={
                        student.status === 'Проживает' ? 'success' : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell align={'center'}>
                    <IconButton onClick={() => handleEditStudent(student)}>
                      <EditIcon />
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
