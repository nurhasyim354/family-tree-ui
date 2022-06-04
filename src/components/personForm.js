import React from 'react';
import { Dialog, DialogTitle, DialogContent, MenuItem, TextField, Button, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import "../index.css"
import { GET_MOTHERS_URL } from '../constants';
import ApiHandler from '../apis/familyTreeApi';

class PersonForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      gender: 'male',
      name: "",
      dob: "1990-01-01",
      idMother: "",
      mothersData: []
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDob = this.handleDob.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleMother = this.handleMother.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.initState = this.initState.bind(this);
  }

  initState() {
    this.setState({
      open: false,
      gender: 'male',
      name: "",
      dob: "1990-01-01",
      idMother: ""
    });
  }

  getMothers() {
    fetch(`${GET_MOTHERS_URL}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            mothersData: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleClickOpen() {
    this.getMothers();
    this.setState({
      open: true
    });
  };

  handleClose() {
    this.initState();
  };

  handleName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleDob(event) {
    this.setState({
      dob: event.target.value
    });
  }

  handleGender(event) {
    this.setState({
      gender: event.target.value
    });
  }

  handleMother(selected) {
    this.setState({
      idMother: selected? selected.id: ""
    });
  }

  async handleSave() {
    const data = {
      name: this.state.name,
      dob: this.state.dob,
      gender: this.state.gender,
      idMother: this.state.idMother
    }
  
    await ApiHandler.createPerson(data);
    this.handleClose();
  }

  render() {
    const { open, mothersData } = this.state;
    return (
      <div>
        <Button color="secondary" onClick={this.handleClickOpen} variant={'contained'} className={"btn-menu"}>+ Personal</Button>

        <Dialog open={open}>
          <DialogTitle id="form-dialog-title">Add Person</DialogTitle>
          <DialogContent>

            <TextField
              id={'name'}
              key={'name'}
              label={'Name'}
              value={this.state.name}
              required={true}
              onChange={this.handleName}
              fullWidth
            />

            <TextField
              id={'dob'}
              key={'dob'}
              type={'date'}
              label={'Tanggal Lahir'}
              value={this.state.dob}
              onChange={this.handleDob}
              fullWidth
            />

            <TextField
              id="gender"
              key={'gender'}
              select
              label="Gender"
              value={this.state.gender}
              onChange={this.handleGender}
              fullWidth
            >
              <MenuItem key={"male"} value={"male"}>
                Pria
              </MenuItem>
              <MenuItem key={"female"} value={"female"}>
                Wanita
              </MenuItem>
            </TextField>

            <Autocomplete
              options={mothersData}
              getOptionLabel={(option) => option.name}
              id="idMother"
              onChange={(event, newValue) => {
                this.handleMother(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Pilih Orang Tua" margin="normal" />}
            />

            <Grid
              className={'btn-grid'}
              container
              justify="flex-end"
              alignItems="center">
              <Button onClick={this.handleSave} color="primary" variant="contained" className={'btn'}>
                Save
              </Button>
              <Button onClick={this.handleClose} color="default" variant="contained" className={'btn'}>
                Cancel
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>

    );
  }
}

export default PersonForm;