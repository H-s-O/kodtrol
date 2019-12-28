import React from 'react';
import styled from 'styled-components';

import MainNav from './components/MainNav';
import Browsers from './components/Browsers';
import ScriptsEditor from './components/scripts/ScriptsEditor';
import TimelineEditor from './components/timelines/TimelineEditor';
import DialogsContainer from './components/DialogsContainer';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const StyledTopRow = styled.div`
`

const StyledBottomRow = styled.div`
  display: flex;
  flex: 1;
  margin-top: 5px;
`

const StyledLeftCol = styled.div`
  width: 300px;
  margin-right: 5px;
`

const StyledRightCol = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const StyledScriptsRow = styled.div`
  height: 50%;
  margin-bottom: 5px;
  `

const StyledTimelinesDashboardsRow = styled.div`
  height: 50%;
`

export default function Main(props) {
  return (
    <>
      <StyledContainer>
        <StyledTopRow>
          <MainNav />
        </StyledTopRow>
        <StyledBottomRow>
          <StyledLeftCol>
            <Browsers />
          </StyledLeftCol>
          <StyledRightCol>
            <StyledScriptsRow>
              <ScriptsEditor />
            </StyledScriptsRow>
            <StyledTimelinesDashboardsRow>
              <TimelineEditor />
            </StyledTimelinesDashboardsRow>
          </StyledRightCol>
        </StyledBottomRow>
      </StyledContainer>
      <DialogsContainer />
    </>
  );
}
