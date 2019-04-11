/**
 *
 * Notes
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, Paper } from '@material-ui/core';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  ContentState,
} from 'draft-js';

const EntryTag = props => (
  <Link href="/dashboard" color="primary">
    {props.children}
  </Link>
);
EntryTag.propTypes = {
  children: PropTypes.array,
};

function entryTagStrategy(contentBlock, callback) {
  findWithRegex(/@[\d]+(A|D|a|d)/g, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr = regex.exec(text);
  let start;
  while (matchArr !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
    matchArr = regex.exec(text);
  }
}

class Notes extends React.Component {
  constructor(props) {
    super(props);
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: entryTagStrategy,
        component: EntryTag,
      },
    ]);

    if (props.notes) {
      this.state = {
        editorState: EditorState.createWithContent(
          ContentState.createFromText(props.notes),
          compositeDecorator,
        ),
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(compositeDecorator),
      };
    }

    this.onChange = editorState => this.setState({ editorState });
  }

  render() {
    return (
      <Paper
        style={{
          padding: '20px',
          paddingBottom: '40px',
          fontSize: '16px',
          margin: '10px',
        }}
      >
        <Editor
          placeholder="Brainstorm theme ideas &amp;	clues. Leave notes for yourself, the editor or your test solvers."
          editorState={this.state.editorState}
          onChange={editorState => {
            this.onChange(editorState);
            this.props.onEdit(editorState.getCurrentContent().getPlainText());
          }}
        />
      </Paper>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
};

Notes.defaultProps = {
  notes: '',
};

export default Notes;
