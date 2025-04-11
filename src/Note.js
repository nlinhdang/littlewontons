import React from "react";
import { useContextSelector } from 'use-context-selector';

import { UserContext } from './Context/Note-userContext';

const NoteComponent = () => {
  const setNote = useContextSelector(UserContext, ({ setNote }) => setNote);
  const formData = useContextSelector(UserContext, ({ formData }) => formData);
  const setFormData = useContextSelector(UserContext, ({ setFormData }) => setFormData);

  function handleNote(e, textarea) {
    textarea.style.height = 'auto'; // Đặt chiều cao về auto để đo chiều cao mới
    textarea.style.height = textarea.scrollHeight + 'px'; // Thiết lập chiều cao mới dựa trên nội dung
    const value = e.target.value;
    setNote(value);
    setFormData(prev => ({
      ...prev,
      note: value, // Cập nhật vào formData
    }));
  }
  return (  
    <div className='note-container'>
        <textarea
          id="note"
          className="note-input"
          rows="2"
          placeholder='If you have any suggestions please let the Little Wontons know!'
          name="note"
          value={formData.note}
          onInput={(e) => handleNote(e, e.target)}
        />
      </div>
  );
}

const Note = React.memo(NoteComponent)
 
export default Note;