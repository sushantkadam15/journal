import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';

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
        <Select
            defaultValue={'paragraph'}
            value={
                currentBlock.type === 'heading'
                    ? currentBlock.type + currentBlock.props.level
                    : currentBlock.type
            }
            options={formatOptions}
            className="min-w-[9rem] text-center font-JetBrains text-sm"
            onChange={handleFormatChange}
        />
    );
};

TextEditorMenu.propTypes = {
    editor: PropTypes.object.isRequired,
    currentBlock: PropTypes.shape({
        type: PropTypes.string,
        props: PropTypes.object
    }).isRequired
};

export default TextEditorMenu;
