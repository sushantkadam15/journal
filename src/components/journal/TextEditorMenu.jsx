import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Select, ColorPicker, Button } from 'antd';
import { MdFormatBold } from 'react-icons/md';
import { BsTypeUnderline, BsTypeItalic } from 'react-icons/bs';
import { FaLightbulb } from 'react-icons/fa6';

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

const TextEditorMenu = ({ editor, currentBlock }) => {
    const handleFormatChange = useCallback(
        (value) => {
            let newBlock = { type: value };

            if (headingLevels[value]) {
                newBlock = {
                    type: 'heading',
                    props: {
                        ...currentBlock.props,
                        level: headingLevels[value]
                    }
                };
            }

            editor.updateBlock(currentBlock, newBlock);
        },
        [currentBlock, editor]
    );

    return (
        <div className="flex items-center justify-between border bg-[#FBFBFB] px-2 font-JetBrains text-[14px] font-light text-[#303030]">
            <div className="b flex h-12 items-center gap-16 ">
                <div>
                    {/* Format  */}

                    <Select
                        defaultValue={'paragraph'}
                        value={
                            currentBlock.type === 'heading'
                                ? currentBlock.type + currentBlock.props.level
                                : currentBlock.type
                        }
                        options={formatOptions}
                        bordered={false}
                        className="min-w-[9rem] text-center font-JetBrains text-sm"
                        onChange={handleFormatChange}
                    />

                    {/* Font  */}
                    <Select defaultValue="lucy" bordered={false} />
                </div>
                <div className="flex items-center gap-6 font-extralight ">
                    <span>
                        Text <ColorPicker size="small" />
                    </span>
                    <span>
                        Highlight <ColorPicker size="small" />
                    </span>
                </div>

                <div className="flex items-center gap-5">
                    <MdFormatBold size={'20'} />
                    <BsTypeUnderline size={'20'} />
                    <BsTypeItalic size={'20'} />
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
