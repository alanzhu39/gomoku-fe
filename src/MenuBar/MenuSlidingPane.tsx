import React from 'react';
import SlidingPane from 'react-sliding-pane';
import './MenuBar.css';

function MenuSlidingPane(props: {
  isOpen: boolean;
  onRequestClose: any;
  children: any;
}) {
  return (
    <SlidingPane
      from='right'
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      hideHeader={true}
      width='800px'
    >
      <div className='MenuSlidingPane'>{props.children}</div>
    </SlidingPane>
  );
}

export default MenuSlidingPane;
