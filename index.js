const express = require('express')
const cors = require('cors')
const app = express()
const port = parseInt(process.env.PORT || 3000)

const cohorts = require('./cohorts.js')

function getDataById(data, id) {
    return data.data.filter(cohort => cohort.id == id)
}

app.get('/', (request, response) => response.json(cohorts))

app.get('/:id', (request, response) => {
    let filteredCohort = getDataById(cohorts, request.params.id)
    if (filteredCohort.length < 1) {
        response.status(404).json({
            error: { message: 'No record found!' }
        })
    } else {
        response.json({ cohort: filteredCohort })
    }
})

app.listen(port)
    .on('error', console.error.bind(console))
    .on('listening', console.log.bind(console, `Listening on ${port}`));