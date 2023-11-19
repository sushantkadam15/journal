import React from 'react';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Link from '@editorjs/link';
import Delimiter from '@editorjs/delimiter';
import CheckList from '@editorjs/checklist';

export const TextEditorConfig = {
    paragraph: {
        class: Paragraph,
        inlineToolbar: true
    },
    checkList: CheckList,
    list: List,
    header: {
        class: Header,
        shortcut: 'CMD+SHIFT+H',
        config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3],
            defaultLevel: 1
        }
    },
    delimiter: Delimiter,
    link: Link
};
