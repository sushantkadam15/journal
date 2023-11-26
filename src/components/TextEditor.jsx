import React, { useEffect, useState } from 'react';
import {
    BlockNoteView,
    lightDefaultTheme,
    useBlockNote
} from '@blocknote/react';
import '@blocknote/core/style.css';

function TextEditor() {
    let initialContent = [];
    try {
        initialContent = JSON.parse(localStorage.getItem('content')) || [];
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
    }

    const [content, setContent] = useState(initialContent || []);

    const lightTheme = {
        ...lightDefaultTheme,
        borderRadius: 4,
        fontFamily: 'JetBrains Mono, monospace',
        borderRadius: 0
    };

    const editor = useBlockNote({
        initialContent: content,
        onEditorReady: () => {
            editor.focus();
        },

        onEditorContentChange: (editor) => {
            const newContent = editor.topLevelBlocks;
            setContent(newContent);
            localStorage.setItem('content', JSON.stringify(newContent));
        }
    });

    // Renders the editor instance using a React component.
    return <BlockNoteView editor={editor} theme={lightTheme} />;
}

export default TextEditor;
