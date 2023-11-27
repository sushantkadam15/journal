import React, { useState } from 'react';
import {
    BlockNoteView,
    lightDefaultTheme,
    useBlockNote,
    getDefaultReactSlashMenuItems
} from '@blocknote/react';
import '@blocknote/core/style.css';

function TextEditor() {
    // Get the initial content from localStorage
    let initialContent = [];
    try {
        initialContent = JSON.parse(localStorage.getItem('content')) || [];
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
    }

    const [content, setContent] = useState(initialContent || []);

    // Customize the theme
    const lightTheme = {
        ...lightDefaultTheme,
        fontFamily: 'JetBrains Mono, monospace',
        borderRadius: 0
    };

    // Customize the slash menu items
    const customizeMenuItems = () => {
        const removeHintsAndShortcuts = (item) => {
            const newItem = { ...item };
            delete newItem.hint;
            delete newItem.shortcut;
            if (newItem.group === 'Basic blocks') {
                newItem.group = 'Basic';
            }
            return newItem;
        };

        const defaultMenuItems = [...getDefaultReactSlashMenuItems()];
        const customizedMenuItems = defaultMenuItems.map(
            removeHintsAndShortcuts
        );
        return customizedMenuItems;
    };

    //  Initialize the editor instance
    const editor = useBlockNote({
        initialContent: content,
        slashMenuItems: customizeMenuItems(),
        onEditorReady: () => {
            editor.focus('end');
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
