import { ListItem, List, ListItemText, ListItemAvatar, Avatar, TextField, InputAdornment } from '@material-ui/core';
import { Search } from "@material-ui/icons"
import React from 'react';
import { Link } from 'react-router-dom';
import { GET_PERSON_URL } from '../constants'

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };

    this.originalData = [];

    this.handleSeacrh = this.handleSeacrh.bind(this);
  }

  componentDidMount() {
    fetch(`${GET_PERSON_URL}`)
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            isLoaded: true,
            data: result.data
          });

          this.originalData = result.data;
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleSeacrh(event) {
    const key = event.target.value;

    this.setState({
      data: this.originalData.filter(p => p.name.toLowerCase().includes(key.toLowerCase()))
    });
  }

  render() {
    const { error, isLoaded, data } = this.state;
    const items = data.map((value, index) => (
      <ListItem key={value.id}>
        <ListItemAvatar>
          <Avatar className={'avatar-small'}>
          </Avatar>
        </ListItemAvatar>
        <ListItemText><Link to={`/person/${value.id}`}><div className="text-link">{value.name}</div></Link></ListItemText>
      </ListItem>
    ));
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <List>
            <ListItem>
              <TextField variant="outlined"
                onChange={this.handleSeacrh}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <Search />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </ListItem>
            {items}
            {/* <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li> */}
          </List>
        </div>

      );
    }
  }
}

export default Navigation;