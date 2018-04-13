import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Button, Glyphicon, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { isFunction } from 'lodash';
import Panel from './Panel';
import TreeView from './TreeView';
import AddScript from '../modals/AddScript';

import styles from '../../../styles/components/partials/scriptsbrowser.scss';

const propTypes = {
  value: PropTypes.arrayOf(PropTypes.shape({})),
  onScriptSelect: PropTypes.func,
  onScriptCreate: PropTypes.func,
};

const defaultProps = {
  value: [],
  onScriptSelect: null,
  onScriptCreate: null,
};

class ScriptsBrowser extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      showAddModal: false,
    };
  }

  onScriptSelect(it) {
    const name = it.label;
    const { onScriptSelect } = this.props;
    if (isFunction(onScriptSelect)) {
      onScriptSelect(name);
    }
  }

  onAddClick() {
    this.setState({
      showAddModal: true,
    });
  }

  onAddCancel() {
    this.setState({
      showAddModal: false,
    });
  }

  onAddSuccess(scriptData) {
    const { onScriptCreate } = this.props;
    if (isFunction(onScriptCreate)) {
      onScriptCreate(scriptData);
    }
    this.setState({
      showAddModal: false,
    });
  }

  render() {
    const { value } = this.props;
    const { showAddModal } = this.state;
    return (
      <Panel
        title="Scripts"
        className={styles.fullHeight}
        headingContent={
          <div
            className="pull-right"
          >
            <Button
              bsSize="xsmall"
              onClick={this.onAddClick}
            >
              <Glyphicon
                glyph="plus"
              />
            </Button>
          </div>
        }
      >
        <TreeView
          value={value}
          onClickItem={this.onScriptSelect}
        />
        <AddScript
          show={showAddModal}
          onCancel={this.onAddCancel}
          onSuccess={this.onAddSuccess}
        />
      </Panel>
    );
  }
};

ScriptsBrowser.propTypes = propTypes;
ScriptsBrowser.defaultProps = defaultProps;

export default ScriptsBrowser;
