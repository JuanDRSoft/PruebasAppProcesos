import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';

const ContextMenuContainer = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu
      id='menu_id'
      onShow={(e) => {
        onContextMenu(e, e.detail.data);
      }}
    >
      <MenuItem onClick={onContextMenuClick} data={{ action: 'move' }}>
        <i className='simple-icon-drawer' /> <span>Activar/Desactivar</span>
      </MenuItem>
      <MenuItem onClick={onContextMenuClick} data={{ action: 'delete' }}>
        <i className='simple-icon-trash' /> <span>Eliminar</span>
      </MenuItem>
    </ContextMenu>
  );
};

export default ContextMenuContainer;
