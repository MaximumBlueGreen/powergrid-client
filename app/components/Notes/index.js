/**
 *
 * Notes
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  ContentState,
} from 'draft-js';

const styles = theme => ({
  entryTag: {
    fontWeight: 'bold',
  },
  valid: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  invalid: {
    color: theme.palette.error.main,
    textDecoration: 'line-through',
  },
});

const EntryTag = ({
  children,
  classes: { valid, invalid, entryTag },
  decoratedText,
  words,
  onEntryTagClicked,
}) => {
  const [, number, direction] = /([\d]+)(A|D)/g.exec(decoratedText);
  const word = words[direction === 'A' ? 'across' : 'down'][number];
  return (
    <Tooltip title={word || ''}>
      <span
        role="presentation"
        onClick={() => onEntryTagClicked(number, direction === 'A')}
        className={[word ? valid : invalid, entryTag]}
      >
        {children}
      </span>
    </Tooltip>
  );
};

EntryTag.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  decoratedText: PropTypes.string.isRequired,
  words: PropTypes.object.isRequired,
  onEntryTagClicked: PropTypes.func.isRequired,
};

function entryTagStrategy(contentBlock, callback) {
  findWithRegex(/([\d]+)(A|D)(?=\s|$)/g, contentBlock, callback);
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
    const { notes } = props;
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: entryTagStrategy,
        component: EntryTag,
        props,
      },
    ]);

    if (notes) {
      this.state = {
        editorState: EditorState.createWithContent(
          ContentState.createFromText(notes),
          compositeDecorator,
        ),
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(compositeDecorator),
      };
    }

    this.state.words = props.words;

    this.onChange = editorState => this.setState({ editorState });
  }

  static getDerivedStateFromProps(props, state) {
    const { editorState, words: prevWords } = state;
    const { words } = props;
    if (words !== prevWords) {
      return {
        editorState: EditorState.set(editorState, {
          decorator: new CompositeDecorator([
            {
              strategy: entryTagStrategy,
              component: EntryTag,
              props,
            },
          ]),
        }),
        words,
      };
    }
    return null;
  }

  render() {
    const { onEdit } = this.props;

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
            onEdit(editorState.getCurrentContent().getPlainText());
          }}
        />
      </Paper>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  words: PropTypes.object.isRequired,
};

Notes.defaultProps = {
  notes: '',
};

export default withStyles(styles)(Notes);
