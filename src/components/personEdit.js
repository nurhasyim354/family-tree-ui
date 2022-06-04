import React from 'react';
import { Dialog, DialogTitle, DialogContent, MenuItem, TextField, Button, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import "../index.css"
import ApiHandler from '../apis/familyTreeApi';

class PersonEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      gender: 'male',
      name: "",
      dob: "1990-01-01",
      idMother: "",
      idFather: "",
      mothersData: [],
      isLoading: true,
      selectedMother: { name: "" }
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDob = this.handleDob.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleMother = this.handleMother.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.initState = this.initState.bind(this);
    this.handleDod = this.handleDod.bind(this);
  }

  initState() {
    this.setState({
      id: "",
      gender: 'male',
      name: "",
      dob: "1990-01-01",
      dod: null,
      idMother: "",
      idFather: ""
    });
  }

  async componentDidMount() {
    const { idPerson } = this.props;
    const mothers = await ApiHandler.getMothers();

    const person = await ApiHandler.getPerson(idPerson);

    if (mothers.error || person.error) {
      this.setState({ isError: true });
      return;
    }

    this.setState({
      name: person.data.name,
      dob: person.data.dob,
      gender: person.data.gender,
      idMother: person.data.idMother,
      dod: person.data.dod,
      mothersData: mothers.data,
      selectedMother: mothers.data.find(m => m.id === person.data.idMother),
      selectedPerson: person.data
    });
  }

  handleClose() {
    this.initState();
    this.props.onClosed();
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

  handleDod(event) {
    this.setState({
      dod: event.target.value
    });
  }

  handleGender(event) {
    this.setState({
      gender: event.target.value
    });
  }

  handleMother(selected) {
    this.setState({
      idMother: selected ? selected.id : "",
      selectedMother: selected ? selected : null
    });
  }

  async handleSave() {
    const data = {
      name: this.state.name,
      dob: this.state.dob,
      gender: this.state.gender,
      idMother: this.state.selectedMother ? this.state.selectedMother.id : "",
      idFather: this.state.selectedMother && this.state.selectedMother.husband ? this.state.selectedMother.husband.id : ""
    }

    if(this.state.dod) {
      Object.assign(data, {dod: this.state.dod});
    }
    console.log({data});

    await ApiHandler.updatePerson(this.state.selectedPerson.id, data);
    this.handleClose();
  }

  render() {
    const { mothersData } = this.state;
    return (
      <div>
        <Dialog open={true}>
          <DialogTitle id="form-dialog-title">Anggota Keluarga</DialogTitle>
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
              value={this.state.selectedMother}
              onChange={(event, newValue) => {
                this.handleMother(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Pilih Orang Tua" margin="normal" />}
            />

            <TextField
              InputLabelProps={{ shrink: true }}
              id={'dod'}
              key={'dod'}
              type={'date'}
              label={'Tanggal Wafat'}
              value={this.state.dod || ""}
              onChange={this.handleDod}
              fullWidth
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

export default PersonEdit;