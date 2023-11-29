import React, { useState } from 'react';
import {
    BlockNoteView,
    lightDefaultTheme,
    useBlockNote,
    getDefaultReactSlashMenuItems
} from '@blocknote/react';
import '@blocknote/core/style.css';
import TextEditorMenu from './TextEditorMenu';
import TextEditorHeader from './TextEditorHeader';

const TextEditor = () => {
    // Get the initial content from localStorage
    let initialContent = [];
    try {
        initialContent = JSON.parse(localStorage.getItem('content')) || [];
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
    }

    const [content, setContent] = useState(initialContent || []);
    const [currentBlock, setCurrentBlock] = useState([]);

    const captureCurrentBlock = (editor) => {
        const currentCursorPositon = editor.getTextCursorPosition().block;
        setCurrentBlock(currentCursorPositon);
    };

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
            captureCurrentBlock(editor);
            const newContent = editor.topLevelBlocks;
            setContent(newContent);
            localStorage.setItem('content', JSON.stringify(newContent));
        },

        onTextCursorPositionChange: (editor) => {
            captureCurrentBlock(editor);
        }
    });

    // Renders the editor instance using a React component.
    return (
        <>
            <TextEditorHeader />
            <div className="relative mx-auto mt-12 h-[85vh] border-slate-200 py-4 md:w-10/12 md:border">
                <BlockNoteView editor={editor} theme={lightTheme} />
                <div className="absolute bottom-1 mx-1">
                    <TextEditorMenu
                        editor={editor}
                        currentBlock={currentBlock}
                    />
                </div>
            </div>
        </>
    );
};

export default TextEditor;
