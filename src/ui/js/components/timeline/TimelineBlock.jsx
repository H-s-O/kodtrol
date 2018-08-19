import React, { PureComponent } from 'react';
import classNames from 'classnames'
import { remote } from 'electron';
import Color from 'color';
import percentString from '../../lib/percentString';
import TimelineItem from './TimelineItem';

import styles from '../../../styles/components/partials/timeline.scss';

class TimelineBlock extends PureComponent {
  onStartAnchorDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.doDragAnchorDown('inTime');
  }

  onEndAnchorDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.doDragAnchorDown('outTime');
  }
  
  doDragAnchorDown = (mode) => {
    const { onAdjustItem, index } = this.props;
    onAdjustItem(index, mode);
  }
  
  render = () => {
    const { data, layerDuration } = this.props;
    const { inTime, outTime, color, name } = data;
    const lightColor = Color(color).isLight();
    
    return (
      <TimelineItem
        {...this.props}
        typeLabel='block'
      >
        <div
          className={classNames({
            [styles.timelineBlock]: true,
            [styles.lightBlock]: lightColor,
          })}
          style={{
            left: percentString(inTime / layerDuration),
            width: percentString((outTime - inTime) / layerDuration),
            backgroundColor: color,
          }}
        >
          <div
            className={classNames({
              [styles.bottomLayer]: true,
            })}
          >
            <div
              onMouseDown={this.onStartAnchorDown}
              className={classNames({
                [styles.dragAnchor]: true,
                [styles.leftAnchor]: true,
              })}
            />
            <div
              onMouseDown={this.onEndAnchorDown}
              className={classNames({
                [styles.dragAnchor]: true,
                [styles.rightAnchor]: true,
              })}
            />
          </div>
          <div
            className={classNames({
              [styles.topLayer]: true,
            })}
          >
            <span
              style={{
                backgroundColor: color,
              }}
              className={styles.timelimeBlockLabel}
            >
              { name }
            </span>
          </div>
        </div>
      </TimelineItem>
    );
  }
}

export default TimelineBlock;
