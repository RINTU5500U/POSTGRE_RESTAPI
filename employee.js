const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.user,
    host: 'localhost',
    database: 'postgres-api',
    password: process.env.password,
    port: 5432
})

module.exports = {
    createEmployee : (req, res) => {
        const {name, email} = req.body
    
        pool.query('INSERT INTO employees (name,email) VALUES ($1,$2) RETURNING * ', [name,email], (error, result) => {
            if (error) {
                throw error
            }
            res.status(200).json({
                msg: 'Data created successfully',
                data: result.rows[0]
            })
        })
    },
    
    getEmployees : (req, res) => {
        const {name, email} = req.body
    
        pool.query('SELECT * FROM employees', (error, result) => {
            if (error) {
                throw error
            }
            res.status(200).json({
                data: result.rows
            })
        })
    },

    getEmployeeById : (req, res) => {
        const id = parseInt(req.params.id)
    
        pool.query('SELECT * FROM employees WHERE id=$1', [id], (error, result) => {
            if (error) {
                throw error
            }
            res.status(200).json({
                data: result.rows
            })
        })
    },

    updateEmployee : (req, res) => {
        const id = parseInt(req.params.id)
        const {name, email} = req.body

        pool.query('UPDATE employees SET name=$1, email=$2 WHERE id=$3', [name, email, id], (error, result) => {
            if (error) {
                throw error
            }
            res.status(200).json({
                msg: 'Data updated successfully'
            })
        })
    },

    deleteEmployee : (req, res) => {
        const id = parseInt(req.params.id)

        pool.query('DELETE FROM employees WHERE id=$1 ', [id], (error, result) => {
            if (error) {
                throw error
            }
            res.status(200).json({
                msg: 'Data deleted successfully'
            })
        })
    }
}