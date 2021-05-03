import React from 'react';
import PropTypes from 'prop-types';
import Btn from '@bbc/igm-btn';
import GELIcon from '@bbc/igm-gel-icon';
import '../scss/sidebar.scss';

function Sidebar(props) {
  const { editorFocused, children, toggle } = props;
  return (
    <div className="sidebar">
      {editorFocused && (
        <div className="sidebar__context-bar" />
      )}
      <Btn onClick={() => toggle(false)} className="sidebar__close" aria-label="Close shortcuts sidebar">
        <GELIcon type="no" className="sidebar__close-icon" />
      </Btn>
      <div className="sidebar__content">{children}</div>
    </div>
  );
}

Sidebar.propTypes = {
  editorFocused: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Sidebar;
