import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { Select, Button, Popover, Input, Alert } from 'antd';
import { MdFormatBold } from 'react-icons/md';
import { BsTypeUnderline, BsTypeItalic } from 'react-icons/bs';
import ColorPicker from './ColorPicker';
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

const fonts = [
    { label: 'JetBrains Mono', value: "'JetBrains Mono', 'monospace'" },
    { label: 'Numans', value: " 'Numans', 'sans-serif'" },
    { label: 'Open Sans', value: " 'Open Sans', 'sans-serif'" },
    { label: 'Oswald', value: " 'Oswald', 'sans-serif'" },
    { label: 'Roboto', value: " 'Roboto', 'sans-serif'" },
    { label: 'Lato', value: " 'Lato', 'sans-serif'" },
    { label: 'Merriweather Sans', value: " 'Merriweather Sans', 'sans-serif'" },
    { label: 'Montserrat', value: " 'Montserrat', 'sans-serif'" },
    { label: 'Noto Sans', value: " 'Noto Sans', 'sans-serif'" }
];

const EditorMenu = ({
    editor,
    selectedBlocks,
    isSelectionActive,
    isTextEditorMenuCollapsed,
    setIsTextEditorMenuCollapsed
}) => {
    const { isDarkMode, fontFamily, setFontFamily } = useTheme();
    const iconColor = isDarkMode ? '#F5F5F5' : '#303030';
    const [openLinkPopover, setOpenLinkPopover] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

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
        const isValidUrl = (string) => {
            try {
                new URL(string);
                return true;
            } catch (_) {
                return false;
            }
        };

        if (!isValidUrl(url)) {
            console.error('Invalid URL');
            return;
        }

        const text = editor.getSelectedText();
        if (!text || text.trim() === '' || !url || url.trim() === '') return;
        editor.addStyles({
            ['textColor']: 'blue',
            ['textDecoration']: 'underline'
        });
        editor.createLink(url, text);
    };

    const linkContent = (
        <Input
            placeholder="Paste Link Here"
            onChange={(e) => setLinkUrl(e.target.value)}
            onPressEnter={() => {
                createLink(linkUrl);
                setOpenLinkPopover(false);
                setLinkUrl('');
            }}
            onBlur={() => {
                setOpenLinkPopover(false);
            }}
        />
    );

    const handleLinkPopoverChange = () => {
        setOpenLinkPopover(true);
    };

    return (
        <div className="flex items-center justify-between border bg-[#FBFBFB] px-2 font-JetBrains text-[14px] font-light text-[#303030] dark:bg-bg-dark-bg-secondary">
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
                        <Select
                            defaultValue={'JetBrains Mono'}
                            style={{
                                width: '160px'
                            }}
                            value={
                                fonts.find((font) => font.value === fontFamily)
                                    ?.label || 'JetBrains Mono'
                            }
                            options={fonts.map(({ label, value }) => ({
                                value,
                                label: (
                                    <div
                                        style={{
                                            fontFamily: value
                                        }}
                                    >
                                        {label}
                                    </div>
                                )
                            }))}
                            bordered={false}
                            className="min-w-[9rem] text-center font-JetBrains text-sm"
                            onChange={(value) => {
                                setFontFamily(value);
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-6 font-extralight">
                        <ColorPicker
                            title="Text"
                            editor={editor}
                            value={memoizedBlockFormat.selectedBlockTextColor}
                            presets={textColorsPresets}
                            colorPickerStyles={'textColor'}
                            handleColorChange={handleColorChange}
                        />
                        <ColorPicker
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
                        <Popover
                            placement="top"
                            content={linkContent}
                            trigger={'click'}
                            open={openLinkPopover}
                        >
                            <Button
                                className="font-JetBrains text-[14px] text-blue-500"
                                type="text"
                                onClick={handleLinkPopoverChange}
                            >
                                Link
                            </Button>
                        </Popover>
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

export default EditorMenu;
