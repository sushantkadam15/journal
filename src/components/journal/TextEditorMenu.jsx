import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Select, Button } from 'antd';
import { MdFormatBold } from 'react-icons/md';
import { BsTypeUnderline, BsTypeItalic } from 'react-icons/bs';
import CustomColorPicker from './CustomColorPicker';
import {
    TbLayoutSidebarLeftCollapse,
    TbLayoutSidebarRightCollapse
} from 'react-icons/tb';
import { useTheme } from '../../contexts/ThemeContext';

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

const TextEditorMenu = ({
    editor,
    selectedBlocks,
    isSelectionActive,
    isTextEditorMenuCollapsed,
    setIsTextEditorMenuCollapsed
}) => {
    const { isDarkMode } = useTheme();
    const iconColor = isDarkMode ? '#F5F5F5' : '#303030';

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

    const handleColorChange = (inputColor, colorPickerStyles) => {
        editor.addStyles({ [colorPickerStyles]: inputColor });
    };

    const toggleTextStyle = (style) => {
        editor.toggleStyles({ [style]: true });
    };
    const createLink = (url) => {
        const text = editor.getSelectedText();
        if (!text || text.trim() === '' || !url || url.trim() === '') return;
        editor.createLink(url, text);
    };

    return (
        <div className="dark:bg-bg-dark-bg-secondary flex items-center justify-between border bg-[#FBFBFB] px-2 font-JetBrains text-[14px] font-light text-[#303030]">
            {!isTextEditorMenuCollapsed && (
                <div className=" flex h-12 items-center gap-16 ">
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
                    <div className="flex items-center gap-6 font-extralight">
                        <CustomColorPicker
                            title="Text"
                            editor={editor}
                            value={memoizedBlockFormat.selectedBlockTextColor}
                            presets={textColorsPresets}
                            colorPickerStyles={'textColor'}
                            handleColorChange={handleColorChange}
                        />
                        <CustomColorPicker
                            title="Highlight"
                            editor={editor}
                            value={
                                memoizedBlockFormat.selectedBlockHighlightColor
                            }
                            presets={highlightColorsPresets}
                            handleColorChange={handleColorChange}
                            colorPickerStyles={'backgroundColor'}
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
                                color={iconColor}
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
                                color={iconColor}
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
                                color={iconColor}
                                onClick={() => toggleTextStyle('italic')}
                            />
                        </span>

                        <Button
                            className="text-[14px] text-blue-500"
                            type="text"
                            onClick={() => createLink('https://google.com')}
                        >
                            Link
                        </Button>
                    </div>
                </div>
            )}

            <div className="my-2">
                <Button
                    type="link"
                    onClick={() =>
                        setIsTextEditorMenuCollapsed(!isTextEditorMenuCollapsed)
                    }
                >
                    {isTextEditorMenuCollapsed ? (
                        <TbLayoutSidebarLeftCollapse
                            size={20}
                            color={iconColor}
                        />
                    ) : (
                        <TbLayoutSidebarRightCollapse
                            size={20}
                            color={iconColor}
                        />
                    )}
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
