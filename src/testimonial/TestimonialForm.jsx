import React from 'react'
import styles from "./testimonialForm.module.css"

function TestimonialForm() {
  return (
    <div className='container mt-4'>
        <div className={styles.header}>
            <h2 className='text-center'>Testimonials Form</h2>
        </div>
        <form>
  <div className="mb-3">
    <label className="form-label">Name</label>
    <input type="text" className="form-control"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Description</label>
    <textarea className="form-control" rows="4"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Click to upload</label>
    <input type="file" className='form-control'/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Status-Inactive</label>
  </div>
  <button type="submit" className="btn btn-primary w-100">Submit</button>
</form>
    </div>
  )
}

export default TestimonialForm