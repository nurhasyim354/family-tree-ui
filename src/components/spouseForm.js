import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Grid, CircularProgress, Snackbar } from '@material-ui/core'
import { Autocomplete, Alert } from '@material-ui/lab'
import "../index.css"
import { GET_PERSON_URL } from '../constants';
import ApiHandler from '../apis/familyTreeApi';

class SpouseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      idPerson: "",
      idSpouse: "",
      marriedAt: "1990-01-01",
      personData: [],
      error: {},
      isError: false
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleIdPerson = this.handleIdPerson.bind(this);
    this.handleIdSpouse = this.handleIdSpouse.bind(this);
    this.handleMarriedDate = this.handleMarriedDate.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.initState = this.initState.bind(this);
  }

  initState() {
    this.setState({
      open: false,
      idPerson: '',
      idSpouse: '',
      marriedAt: "1990-01-01"
    });
  }

  getData() {
    fetch(`${GET_PERSON_URL}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoading: false,
            personData: result.data
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            error
          });
        }
      );
  }

  handleClickOpen() {
    this.getData();
    this.setState({
      open: true
    });
  };

  handleClose() {
    this.initState();
  };

  handleIdPerson(selected) {
    this.setState({
      idPerson: selected ? selected.id : ''
    });
  }

  handleIdSpouse(selected) {
    this.setState({
      idSpouse: selected ? selected.id : ''
    });
  }

  handleMarriedDate(event) {
    this.setState({
      marriedAt: event.target.value
    });
  }

  async handleSave() {
    const data = {
      idPerson: this.state.idPerson,
      idSpouse: this.state.idSpouse,
      marriedAt: this.state.marriedAt
    };

    const result = await ApiHandler.createSpouse(data);
    if (!result.ok) {
      this.setState({
        isError: true,
        error: await result.json()
      });
    } else {
      this.handleClose();
    }

  }

  render() {
    const { open, personData, error, isError, isLoading } = this.state;
    return (
      <div>
        <Button color="secondary" onClick={this.handleClickOpen} variant={'contained'} className={"btn-menu"}>+ Pasangan</Button>

        <Dialog open={open}>
          <DialogTitle id="form-dialog-title">Pasangan</DialogTitle>
          <DialogContent>

            <Autocomplete
              options={personData.filter(p => p.gender === 'male')}
              getOptionLabel={(option) => option.name}
              id="idPerson"
              onChange={(event, newValue) => {
                this.handleIdPerson(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Pilih Suami" margin="normal" />}
            />

            <Autocomplete
              options={personData.filter(p => p.gender === 'female')}
              getOptionLabel={(option) => option.name}
              id="idSpouse"
              onChange={(event, newValue) => {
                this.handleIdSpouse(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Pilih Istri" margin="normal" />}
            />

            <TextField
              id={'marriedAt'}
              key={'marriedAt'}
              type={'date'}
              defaultValue={'1990-01-01'}
              label={'Tanggal Pernikahan'}
              value={this.state.marriedAt}
              onChange={this.handleMarriedDate}
              fullWidth
            />

            <Snackbar open={isError} autoHideDuration={3000} onClose={() => this.setState({ isError: false })}>
              <Alert severity="error" elevation={6} variant={'filled'} className={"alert-form"}>{error.message}</Alert>
            </Snackbar>

            <Grid
              className={'btn-grid'}
              container
              justify="flex-end"
              alignItems="center">
              {isLoading && <CircularProgress color={"secondary"} size={20} className={"loader-form"}></CircularProgress>}
              {!isLoading &&
                <div>
                  <Button onClick={this.handleSave} color="primary" variant="contained" className={'btn'}>
                    Save
                  </Button>
                  <Button onClick={this.handleClose} color="default" variant="contained" className={'btn'}>
                    Cancel
                  </Button>
                </div>
              }
            </Grid>
          </DialogContent>
        </Dialog>
      </div>

    );
  }
}

export default SpouseForm;