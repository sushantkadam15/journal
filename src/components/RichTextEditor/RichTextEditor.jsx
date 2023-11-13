// src/Tiptap.jsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react';

// define your extension array
const extensions = [
  StarterKit,
]

const content = '<p>Hello World!</p>'


const RichTextEditor = () => {

  const editor = useEditor({
    extensions,
    content,
  })

  return (
    <>
      <EditorContent editor={editor} onChange={() => console.log(editor.getJSON()
)}/>
    </>
  )
};

export default RichTextEditor;
