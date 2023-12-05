import React, { useState, useCallback, useRef } from 'react';
import {
    BlockNoteView,
    lightDefaultTheme,
    darkDefaultTheme,
    useBlockNote,
    getDefaultReactSlashMenuItems,
    Toolbar
} from '@blocknote/react';
import '@blocknote/core/style.css';
import TextEditorMenu from './TextEditorMenu';
import TextEditorHeader from './TextEditorHeader';

const TextEditor = () => {
    // Get the initial content from localStorage
    let initialContent = [];
    const containerRef = useRef(null);

    try {
        initialContent = JSON.parse(localStorage.getItem('content')) || [];
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
    }

    const [content, setContent] = useState(initialContent || []);
    const [selectedBlocks, setSelectedBlocks] = useState([]);
    const [isSelectionActive, setIsSelectionActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    // Customize the theme
    const lightTheme = {
        ...lightDefaultTheme,
        fontFamily: 'JetBrains Mono, monospace',
        borderRadius: 0
    };
    const darkTheme = {
        ...darkDefaultTheme,
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
            scrollToBottom();
        },

        onEditorContentChange: (editor) => {
            // Capture the current block when the content changes for formatting purposes
            captureSelectedBlocks(editor);

            // Update the content in localStorage
            setContent(editor.topLevelBlocks);
            localStorage.setItem(
                'content',
                JSON.stringify(editor.topLevelBlocks)
            );

            // Scroll to the bottom of the editor to keep the cursor in view
            scrollToBottom();
        },

        onTextCursorPositionChange: (editor) => {
            captureSelectedBlocks(editor);
        }
    });

    const captureSelectedBlocks = useCallback(
        (editor) => {
            const currentSelectedBlocks = editor.getSelection()?.blocks;
            const currentActiveBlock = editor.getTextCursorPosition().block;

            if (currentSelectedBlocks) {
                setSelectedBlocks(currentSelectedBlocks);
                setIsSelectionActive(true);
            } else {
                isSelectionActive && setIsSelectionActive(false);
                setSelectedBlocks([currentActiveBlock]);
            }
        },
        [selectedBlocks, isSelectionActive]
    );

    // Renders the editor instance using a React component.
    return (
        <div className="m-4">
            <TextEditorHeader />
            <div className=" mx-auto mt-12 h-[88vh] max-h-[90vh]  border-slate-200 py-4 md:w-10/12 md:border">
                <div
                    className={`mb-5 h-[95%] overflow-auto  ${
                        isFocused &&
                        '[-ms-overflow-style:"none"] [scrollbar-width:"none"] [&::-webkit-scrollbar]:hidden'
                    }`}
                    ref={containerRef}
                    onFocus={() => setIsFocused(true)}
                >
                    <BlockNoteView
                        editor={editor}
                        theme={lightTheme}
                        // onBlur={() => {
                        //     editor.focus();
                        // }}
                    />
                </div>

                <div className="min-w-[81vw]">
                    <TextEditorMenu
                        editor={editor}
                        selectedBlocks={selectedBlocks}
                        setSelectedBlocks={setSelectedBlocks}
                        isSelectionActive={isSelectionActive}
                        setIsSelectionActive={setIsSelectionActive}
                    />
                </div>
            </div>
        </div>
    );
};

export default TextEditor;
