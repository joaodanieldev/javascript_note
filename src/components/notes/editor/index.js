import React, { Fragment, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function Editor(props){
  const [currentContent, setCurrentContet] = useState('');
  const [timer, setTimer] = useState(null);

  const updateNote = (content) => {
    const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, 30);
    props.updateNote(props.note, {'title': title, 'body': content})
  }

  const handleChange = (content, delta, source) => {
    clearTimeout(timer)
    if (source == 'user'){
      setCurrentContet(content);
      setTimer(setTimeout(() => updateNote(content), 2000))
    }
  }

  useEffect(() => {
    setCurrentContet(props.note.body)
  }, [props.note])

  const modules = {
    toolbar: [
      [{ 'header': '1' }, {'header': '2'}, {'font': [] }],
      ['bold','italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent:': '-1'}, {'indent:': '+1'}],
      ['link']
      ['clean']
    ]
  }

  return (
    <Fragment>
      <ReactQuill value={currentContent} modules={modules} onChange={handleChange}/>
    </Fragment>
  )
}

export default Editor;