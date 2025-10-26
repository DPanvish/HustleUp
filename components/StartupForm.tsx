// This is component is rendered on the client side.
// Because it uses a form element, we need to use "use client" at the top of this file.

"use client"


import React, { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <form action={() => {}} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form-label">Title</label>
        <Input id="title" name="title" className="startup-form-input" required placeholder="Startup Title" />

        {errors.title && <p className="startup-form-error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form-label">Description</label>
        <Textarea id="description" name="description" className="startup-form-textarea" required placeholder="Startup Description" />

        {errors.description && <p className="startup-form-error">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form-label">Category</label>
        <Input id="category" name="category" className="startup-form-input" required placeholder="Startup Category (Tech, Health, Education, etc.)s" />

        {errors.category && <p className="startup-form-error">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className="startup-form-label">Image URL</label>
        <Input id="link" name="link" className="startup-form-input" required placeholder="Startup Image URLs" />

        {errors.link && <p className="startup-form-error">{errors.link}</p>}
      </div>
    </form>
  )
}

export default StartupForm
