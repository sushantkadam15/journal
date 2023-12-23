import React, { useState, useCallback, useRef } from 'react';
import {
    BlockNoteView,
    useBlockNote,
    getDefaultReactSlashMenuItems
} from '@blocknote/react';
import '@blocknote/core/style.css';
import EditorMenu from './EditorMenu';
import EditorHeader from './EditorHeader';
import PromptDisplayCard from './PromptDisplayCard';
import { useTheme } from '../../contexts/ThemeContext';

// Main TextEditor component
const Editor = () => {
    // Get the initial content from localStorage
    let initialContent = [];
    const containerRef = useRef(null);

    // Try to parse the content from localStorage
    try {
        initialContent = JSON.parse(localStorage.getItem('content')) || [];
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
    }

    // State variables
    const [content, setContent] = useState(initialContent || []);
    const [selectedBlocks, setSelectedBlocks] = useState([]);
    const [isSelectionActive, setIsSelectionActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isPromptDisplayVisible, setIsPromptDisplayVisible] = useState(false);
    const [currentMood, setCurrentMood] = useState('happy');
    const [isFocusModeOn, setIsFocusModeOn] = useState(false);
    const [isTextEditorMenuCollapsed, setIsTextEditorMenuCollapsed] =
        useState(false);

    const [isMusicOn, setIsMusicOn] = useState(false);

    // Function to scroll to the bottom of the editor
    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };
    const { blockNoteTheme, toggleDarkMode } = useTheme();

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

    // Function to capture selected blocks
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
            <EditorHeader
                currentMood={currentMood}
                setCurrentMood={setCurrentMood}
                isFocusModeOn={isFocusModeOn}
                setIsFocusModeOn={setIsFocusModeOn}
                setIsPromptDisplayVisible={setIsPromptDisplayVisible}
                setIsTextEditorMenuCollapsed={setIsTextEditorMenuCollapsed}
                toggleDarkMode={toggleDarkMode}
                isMusicOn={isMusicOn}
                setIsMusicOn={setIsMusicOn}
            />
            <div
                className={` mx-auto  flex  flex-col border-slate-200 md:w-10/12 md:border ${
                    isFocusModeOn
                        ? 'h-[98vh] pt-5'
                        : ' mt-12  h-[88vh] max-h-[90vh]'
                }`}
            >
                {!isFocusModeOn && (
                    <PromptDisplayCard
                        isPromptDisplayVisible={isPromptDisplayVisible}
                        setIsPromptDisplayVisible={setIsPromptDisplayVisible}
                        currentMood={currentMood}
                    />
                )}

                {/* Text Editor  */}
                <div
                    className={`items-start overflow-auto  ${
                        isFocused &&
                        '[-ms-overflow-style:"none"] [scrollbar-width:"none"] [&::-webkit-scrollbar]:hidden'
                    }`}
                    ref={containerRef}
                    onFocus={() => setIsFocused(true)}
                >
                    <BlockNoteView editor={editor} theme={blockNoteTheme} />
                </div>

                <div
                    className={`mt-auto ${
                        !isTextEditorMenuCollapsed ? '' : 'ml-auto'
                    }`}
                >
                    <EditorMenu
                        editor={editor}
                        selectedBlocks={selectedBlocks}
                        setSelectedBlocks={setSelectedBlocks}
                        isSelectionActive={isSelectionActive}
                        setIsSelectionActive={setIsSelectionActive}
                        isTextEditorMenuCollapsed={isTextEditorMenuCollapsed}
                        setIsTextEditorMenuCollapsed={
                            setIsTextEditorMenuCollapsed
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Editor;
