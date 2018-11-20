import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MoneyIcon from '@material-ui/icons/Money';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const AppBarStyle = {
  display: 'top',
  alignItems: 'center'
}

class AppBarComponent extends React.Component{
    render(){
        return(
          <AppBar position="static" style={AppBarStyle}>
          <Toolbar>
            <MoneyIcon />
            <Typography variant="h6" color="inherit" noWrap>
              Crypto-Analyzer
        </Typography>
          </Toolbar>
        </AppBar>
        );
    }
}

export default AppBarComponent;