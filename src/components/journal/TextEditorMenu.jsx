import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import prompts from './prompts.json';

import { Select, Button } from 'antd';
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
    const memoizedBlockFormat = useMemo(() => {
        const selectedBlock = selectedBlocks[0];
        const { type, props } = selectedBlock || {};
        const {
            textColor = 'black',
            backgroundColor = 'transparent',
            bold = false,
            underline = false,
            italic = false
        } = editor.getActiveStyles();

        return {
            selectedBlockStyle: type === 'heading' ? type + props.level : type,
            selectedBlockTextColor: textColor,
            selectedBlockHighlightColor: backgroundColor,
            isSelectedBlockTextBold: bold,
            isSelectedBlockTextUnderline: underline,
            isSelectedBlockTextItalic: italic
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

    const handleColorChange = (style, value) => {
        const inputColor = value.metaColor.originalInput;
        editor.addStyles({ [style]: inputColor });
    };

    const toggleTextStyle = (style) => {
        editor.toggleStyles({ [style]: true });
    };
    const createLink = (url) => {
        const text = editor.getSelectedText();
        if (!text || text.trim() === '' || !url || url.trim() === '') return;
        editor.createLink(url, text);
    };

    const generatePrompt = (emotion) => {
        const positiveMoods = ['Happy', 'Relaxed', 'Excited'];
        const selectedEmotion =
            emotion ||
            positiveMoods[Math.floor(Math.random() * positiveMoods.length)];

        const promptsArray = prompts[selectedEmotion];
        const randomIndex = Math.floor(Math.random() * promptsArray.length);
        const currentPrompt = promptsArray[randomIndex];

        const promptBlock = {
            type: 'heading',
            content: currentPrompt,
            props: {
                level: 3
            }
        };
        const lastBlock =
            editor.topLevelBlocks[editor.topLevelBlocks.length - 1];
        editor.insertBlocks([promptBlock], lastBlock);
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
                        handleColorChange={() => handleColorChange('textColor')}
                    />
                    <CustomColorPicker
                        title="Highlight"
                        editor={editor}
                        value={memoizedBlockFormat.selectedBlockHighlightColor}
                        presets={highlightColorsPresets}
                        handleColorChange={() =>
                            handleColorChange('backgroundColor')
                        }
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
                        <MdFormatBold
                            size={'20'}
                            onClick={() => toggleTextStyle('bold')}
                        />
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
                            onClick={() => toggleTextStyle('underline')}
                        />
                    </span>
                    <span
                        className={
                            memoizedBlockFormat.isSelectedBlockTextItalic
                                ? `rounded-md bg-slate-200`
                                : ''
                        }
                    >
                        <BsTypeItalic
                            size={'20'}
                            onClick={() => toggleTextStyle('italic')}
                        />
                    </span>

                    <Button className="text-[14px] text-blue-500" type="text"
                    onClick={() => createLink('https://google.com')}
                    >
                        Link
                    </Button>
                </div>
            </div>
            <div>
                <Button
                    className="flex items-center gap-2"
                    type="text"
                    onClick={() => generatePrompt()}
                >
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
