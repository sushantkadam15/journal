import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Select, ColorPicker, Button } from 'antd';
import { MdFormatBold } from 'react-icons/md';
import { BsTypeUnderline, BsTypeItalic } from 'react-icons/bs';
import { FaLightbulb } from 'react-icons/fa6';
import CustomColorPicker from './CustomColorPicker';

const headingLevels = { heading1: 1, heading2: 2, heading3: 3 };

const formatOptions = [
    {
        value: 'paragraph',
        label: 'Paragraph'
    },
    {
        value: 'heading1',
        label: 'Heading'
    },
    {
        value: 'heading2',
        label: 'Heading 2'
    },
    {
        value: 'heading3',
        label: 'Heading 3'
    },
    {
        value: 'bulletListItem',
        label: 'Bullet List'
    },
    {
        value: 'numberedListItem',
        label: 'Numbered List'
    }
];

const textColorsPresets = [
    {
        label: 'Recommended',
        colors: [
            'grey',
            'brown',
            'black',
            'orange',
            'yellow',
            'green',
            'blue',
            'purple',
            'pink'
        ]
    },
    {
        label: 'Recent',
        colors: []
    }
];

const highlightColorsPresets = [
    {
        label: 'Recommended',
        colors: [
            'grey',
            'brown',
            'black',
            'orange',
            'yellow',
            'green',
            'blue',
            'purple',
            'pink'
        ]
    },
    {
        label: 'Recent',
        colors: []
    }
];

const TextEditorMenu = ({ editor, selectedBlocks, isSelectionActive }) => {
    const handleTextColorChange = (value) => {
        const inputColor = value.metaColor.originalInput;
        editor.addStyles({ textColor: inputColor });
    };
    const handleHighlightColorChange = (value) => {
        const inputColor = value.metaColor.originalInput;
        editor.addStyles({ backgroundColor: inputColor });
    };

    const memoizedBlockFormat = useMemo(() => {
        const selectedBlock = selectedBlocks[0];
        const selectedBlockStyle =
            selectedBlock?.type === 'heading'
                ? selectedBlock?.type + selectedBlock.props.level
                : selectedBlock?.type;
        const currentStyles = editor.getActiveStyles();

        const selectedBlockTextColor = currentStyles.textColor || 'black';
        const selectedBlockHighlightColor =
            currentStyles.backgroundColor || 'transparent';
        const isSelectedBlockTextBold = currentStyles.bold || false;
        const isSelectedBlockTextUnderline = currentStyles.underline || false;
        const isSelectedBlockTextItalic = currentStyles.italic || false;
        return {
            selectedBlockStyle,
            selectedBlockTextColor,
            selectedBlockHighlightColor,
            isSelectedBlockTextBold,
            isSelectedBlockTextUnderline,
            isSelectedBlockTextItalic
        };
    }, [editor, selectedBlocks, isSelectionActive]);

    const handleBlockTypeChange = (value) => {
        selectedBlocks.forEach((block) => {
            let newBlock = { type: value };

            if (headingLevels[value]) {
                newBlock = {
                    type: 'heading',
                    props: {
                        ...block.props,
                        level: headingLevels[value]
                    }
                };
            }

            editor.updateBlock(block, newBlock);
        });
    };

    const toggleTextBold = () => {
        editor.toggleStyles({ bold: true });
    };
    const toggleTextUnderline = () => {
        editor.toggleStyles({ underline: true });
    };
    const toggleTextItalics = () => {
        editor.toggleStyles({ italic: true });
    };

    return (
        <div className="flex items-center justify-between border bg-[#FBFBFB] px-2 font-JetBrains text-[14px] font-light text-[#303030]">
            <div className="b flex h-12 items-center gap-16 ">
                <div>
                    {/* Format  */}

                    <Select
                        defaultValue={'paragraph'}
                        value={
                            memoizedBlockFormat.selectedBlockStyle ||
                            'paragraph'
                        }
                        options={formatOptions}
                        bordered={false}
                        className="min-w-[9rem] text-center font-JetBrains text-sm"
                        onChange={handleBlockTypeChange}
                    />

                    {/* Font  */}
                    <Select defaultValue="lucy" bordered={false} />
                </div>
                <div className="flex items-center gap-6 font-extralight ">
                    <CustomColorPicker
                        title="Text"
                        editor={editor}
                        value={memoizedBlockFormat.selectedBlockTextColor}
                        presets={textColorsPresets}
                        handleColorChange={handleTextColorChange}
                    />
                    <CustomColorPicker
                        title="Highlight"
                        editor={editor}
                        value={memoizedBlockFormat.selectedBlockHighlightColor}
                        presets={highlightColorsPresets}
                        handleColorChange={handleHighlightColorChange}
                    />
                </div>

                <div className="flex items-center gap-5">
                    <span
                        className={
                            memoizedBlockFormat.isSelectedBlockTextBold
                                ? `rounded-md bg-slate-200`
                                : ''
                        }
                    >
                        <MdFormatBold size={'20'} onClick={toggleTextBold} />
                    </span>
                    <span
                        className={
                            memoizedBlockFormat.isSelectedBlockTextUnderline
                                ? `rounded-md bg-slate-200`
                                : ''
                        }
                    >
                        <BsTypeUnderline
                            size={'20'}
                            onClick={toggleTextUnderline}
                        />
                    </span>
                    <span
                        className={
                            memoizedBlockFormat.isSelectedBlockTextItalic
                                ? `rounded-md bg-slate-200`
                                : ''
                        }
                    >
                        <BsTypeItalic size={'20'} onClick={toggleTextItalics} />
                    </span>

                    <Button className="text-[14px] text-blue-500" type="text">
                        Link
                    </Button>
                </div>
            </div>
            <div>
                <Button className="flex items-center gap-2" type="text">
                    <FaLightbulb />
                    Add Prompt
                </Button>
            </div>
        </div>
    );
};

TextEditorMenu.propTypes = {
    editor: PropTypes.object.isRequired,
    currentBlock: PropTypes.shape({
        type: PropTypes.string,
        props: PropTypes.object
    })
};

TextEditorMenu.defaultProps = {
    currentBlock: {}
};

export default TextEditorMenu;
