import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

class FilterFormComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      selectedDate: '',
      enteredCurrency: '',
    }
  }
  handleTextChange = (e) => {
    var typedCurrency = (e.target.value).toString().toUpperCase();
    this.enteredCurrency = typedCurrency;
    console.log(typedCurrency);
  }

  handleDateChange = (e) => {
    var convertDateToString = moment(e.target.value).format('YYYYMMDD');
    this.selectedDate = convertDateToString;
    console.log(convertDateToString);
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.sendData(false, this.selectedDate, this.enteredCurrency);
  };


  handleFilterOk = () => {
    this.handleClose();
  }

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Filter by Date or Currency </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            type="date"
            fullWidth
            onChange={this.handleDateChange.bind(this)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="currencyText"
            placeholder="Type Currency eg. ETC"
            type="text"
            fullWidth
            onChange={this.handleTextChange.bind(this)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={this.handleFilterOk} color="primary">
            Ok
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default FilterFormComponent;