/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type {CommandListenerEditorPriority} from 'lexical';

import * as React from 'react';
import {useEffect, useState} from 'react';
import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import stylex from 'stylex';

const EditorPriority: CommandListenerEditorPriority = 0;

const styles = stylex.create({
  root: {
    minHeight: 150,
    border: 0,
    resize: 'none',
    cursor: 'text',
    fontSize: 15,
    caretColor: 'rgb(5, 5, 5)',
    display: 'block',
    position: 'relative',
    tabSize: 1,
    outline: 0,
    padding: 10,
  },
});

export default function ContentEditable({
  className,
}: {
  className?: string,
}): React$Node {
  const [editor] = useLexicalComposerContext();
  const [isReadOnly, setIsReadyOnly] = useState(false);

  useEffect(() => {
    return editor.addListener(
      'command',
      (type, payload) => {
        if (type === 'readOnly') {
          const readOnly = payload;
          setIsReadyOnly(readOnly);
        }
        return false;
      },
      EditorPriority,
    );
  }, [editor]);

  return (
    <LexicalContentEditable
      className={className || stylex(styles.root)}
      readOnly={isReadOnly}
    />
  );
}