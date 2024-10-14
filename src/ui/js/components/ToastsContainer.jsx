import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { Toaster, Intent, Icon } from '@blueprintjs/core';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { ipcRendererListen, ipcRendererClear } from '../lib/ipcRenderer';
import { APP_WARNING, SCRIPT_ERROR } from '../../../common/js/constants/events';
import { ICON_TIMELINE, ICON_BOARD, ICON_SCRIPT } from '../../../common/js/constants/icons';

const StyledTitle = styled.p`
  margin: 0;
  font-weight: bold;
`

const StyledHr = styled.hr`
  border: 0;
  border-top: 1px solid #FFF;
`

const StyledPreMessage = styled.pre``;

const StyledPlainMessage = styled.p``;

export default function ToastsContainer() {
  const scripts = useSelector((state) => state.scripts);
  const timelines = useSelector((state) => state.timelines);
  const boards = useSelector((state) => state.boards);

  const scriptsNames = useMemo(() => {
    return scripts.reduce((obj, { id, name }) => ({ ...obj, [id]: name }), {});
  }, [scripts]);
  const timelinesNames = useMemo(() => {
    return timelines.reduce((obj, { id, name }) => ({ ...obj, [id]: name }), {});
  }, [timelines]);
  const boardsNames = useMemo(() => {
    return boards.reduce((obj, { id, name }) => ({ ...obj, [id]: name }), {});
  }, [boards]);

  const ref = useRef();

  const scriptErrorHandler = useCallback((e, { script, message, hook, timeline, board }) => {
    if (ref.current) {
      const breadcrumb = (
        <>
          Error in
          {timeline ? <> <Icon icon={ICON_TIMELINE} /> {timelinesNames[timeline]}<Icon icon="chevron-right" /></> : null}
          {board ? <> <Icon icon={ICON_BOARD} /> {boardsNames[board]}<Icon icon="chevron-right" /></> : null}
          <> <Icon icon={ICON_SCRIPT} /> {scriptsNames[script]}</>
          {hook ? <><Icon icon="chevron-right" />{hook}() hook</> : null}
        </>
      );

      ref.current.show({
        icon: 'error',
        intent: Intent.DANGER,
        message: (
          <>
            <StyledTitle>{breadcrumb}</StyledTitle>
            <StyledHr />
            <StyledPreMessage>{message}</StyledPreMessage>
          </>
        )
      });
    }
  }, [ref, scripts, timelines, boards]);

  const appWarningHandler = useCallback((e, message) => {
    if (ref.current) {
      ref.current.show({
        icon: 'warning',
        intent: Intent.WARNING,
        message: (
          <>
            <StyledTitle>Warning</StyledTitle>
            <StyledHr />
            <StyledPlainMessage>{message}</StyledPlainMessage>
          </>
        )
      });
    }
  }, [ref]);

  useEffect(() => {
    ipcRendererListen(SCRIPT_ERROR, scriptErrorHandler);
    return () => ipcRendererClear(SCRIPT_ERROR, scriptErrorHandler);
  }, []);

  useEffect(() => {
    ipcRendererListen(APP_WARNING, appWarningHandler);
    return () => ipcRendererClear(APP_WARNING, appWarningHandler);
  }, []);

  return (
    <Toaster
      ref={ref}
      maxToasts={5}
    />
  )
}
