const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = 5000
const {createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee} = require('./employee')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/add', createEmployee)
app.get('/all', getEmployees)
app.get('/:id', getEmployeeById)
app.put('/:id', updateEmployee)
app.delete('/:id', deleteEmployee)

app.listen(PORT, () => {
    console.log('Server is runnning on port ' + PORT + '...')
})