import * as React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'


function CourseSelect({course, courses, handleChange}) {
    const courseSelects = []
    for (let i = 0; i <courses.length; i++) {
        courseSelects.push(<MenuItem key={i} value={courses[i]}>{courses[i]}</MenuItem>)
    }
    

    function handleFormChange(event) {
        handleChange(event.target.value)
    }

    return (
        <FormControl fullWidth id="course-form">
            <InputLabel id="course-select">Course</InputLabel>
            <Select
                labelId="course-select"
                id="course"
                value={course}
                label="Course"
                onChange={handleFormChange}
            >
                {courseSelects}
            </Select>
            </FormControl>        
    )
}

export { CourseSelect }