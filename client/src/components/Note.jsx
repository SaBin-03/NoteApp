import React from 'react'
import NoteContent from '../pages/NoteContent'
import Navbar from '../pages/Navbar'

const Note = () => {
  return (
    <div className='h-screen w-screen bg-linear-to-br from-slate-950 via-slate-900 to-black'>
        <Navbar />
        <NoteContent />
    </div>
  )
}

export default Note
