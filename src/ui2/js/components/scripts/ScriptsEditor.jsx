import React, { useCallback, useMemo } from 'react';
import { Tab, Button, NonIdealState, Icon, Intent } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import FullHeightCard from '../ui/FullHeightCard';
import ScriptEditor from './ScriptEditor';
import FullHeightTabs from '../ui/FullHeightTabs';
import { closeScriptAction, saveEditedScriptAction, focusEditedScriptAction } from '../../../../common/js/store/actions/scripts';
import { ICON_SCRIPT } from '../../../../common/js/constants/icons';

const StyledIcon = styled(Icon)`
  margin-right: 3px;
`;

const StyledCloseButton = styled(Button)`
  margin-left: 3px;
`;

const StyleFillDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const TabLabel = ({ id, changed, scriptsNames, closeScript }) => {
  return (
    <>
      <StyledIcon
        icon={ICON_SCRIPT}
        intent={changed ? Intent.WARNING : undefined}
      />
      {scriptsNames[id]}
      <StyledCloseButton
        small
        minimal
        icon="small-cross"
        onClick={(e) => {
          e.stopPropagation();
          closeScript(id);
        }}
      />
    </>
  );
}

export default function ScriptsEditor() {
  const scripts = useSelector((state) => state.scripts);
  const editScripts = useSelector((state) => state.editScripts);

  const scriptsNames = useMemo(() => {
    return scripts.reduce((obj, { id, name }) => ({ ...obj, [id]: name }), {});
  }, [scripts]);
  const activeScript = useMemo(() => {
    return editScripts.find((script) => script.active);
  }, [editScripts]);

  const dispatch = useDispatch();
  const saveHandler = useCallback(() => {
    dispatch(saveEditedScriptAction(activeScript.id));
  }, [dispatch, activeScript]);
  const closeHandler = useCallback((id) => {
    dispatch(closeScriptAction(id));
  }, [dispatch]);
  const tabChangeHandler = useCallback((id) => {
    dispatch(focusEditedScriptAction(id));
  }, [dispatch]);

  return (
    <FullHeightCard>
      {editScripts && editScripts.length ? (
        <FullHeightTabs
          selectedTabId={activeScript ? activeScript.id : undefined}
          onChange={tabChangeHandler}
        >
          {editScripts.map(({ id, changed }) => (
            <Tab
              key={id}
              id={id}
              panel={(
                <ScriptEditor
                  id={id}
                />
              )}
            >
              <TabLabel
                id={id}
                changed={changed}
                scriptsNames={scriptsNames}
                closeScript={closeHandler}
              />
            </Tab>
          ))}
          <FullHeightTabs.Expander />
          <Button
            small
            icon="settings"
          />
        </FullHeightTabs>
      ) : (
          <NonIdealState
            icon={ICON_SCRIPT}
            description="Double-click a script in the script browser to edit it here."
          />
        )
      }
    </FullHeightCard >
  );
}
