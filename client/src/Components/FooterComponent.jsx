import React from 'react';
import Typography from '@material-ui/core/Typography';

class FooterComponent extends React.Component {
    render() {
        return (
            <footer >
                <Typography variant="subtitle2" align="center" color="inherit">
                    Crypto-Analyzer 2018 &copy;
                </Typography>
            </footer>
        );
    }
}

export default FooterComponent;