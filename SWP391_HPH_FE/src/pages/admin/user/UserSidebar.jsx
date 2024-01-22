import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function UserSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        overflow: 'auto',
        borderLeft: '1px solid #B2BABB',
        minHeight: '100vh',
        height: '100%',
        minWidth: { md: 100 },
      }}
    >
      <List>
        {['All', 'Student', 'Manager'].map((text, index) => (
          <div key={index}>
            <ListItem
              key={index}
              disablePadding
              onClick={() => navigate(`${text.toLowerCase()}`)}
            >
              <ListItemButton
                sx={{
                  '&.selected': {
                    bgcolor: '#034ea2',
                    color: '#fff',
                  },
                }}
                className={
                  pathname.includes(`user/${text.toLowerCase()}`)
                    ? 'selected'
                    : ''
                }
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ color: '#B2BABB' }} />
          </div>
        ))}
      </List>
    </Box>
  );
}
