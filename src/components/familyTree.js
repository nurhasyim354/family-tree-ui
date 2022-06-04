import React from 'react';
// import 'react-tree-graph/dist/style.css'
import Tree from 'react-tree-graph';
import { GET_TREE_URL } from '../constants'
import { Grid } from '@material-ui/core';
import "../index.css"
import PersonEdit from "./personEdit"

const nodeSpacing = 50;

class FamilyTree extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      width: 0,
      height: 0,
      selectedPerson: "",
      showEdit: false,
      instance: this
    };

    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getTree(id);
    this.updateWindowDimensions();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.selectedId) {
      const { instance } = prevState;
      instance.getTree(nextProps.match.params.id);
      return { selectedId: nextProps.match.params.id };
    }
    else return null;
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight - 100 });
  }

  getTree(personId) {
    fetch(`${GET_TREE_URL}/${personId}`)
      .then(res => res.json())
      .then(
        (result) => {
          //calculate nummber of childs
          const levelChilds = this.getChildsCount(result.data);

          let maxHeight = 0;
          Object.keys(levelChilds).forEach(c => {
            const newHeight = levelChilds[c] * nodeSpacing;
            maxHeight = newHeight > maxHeight ? newHeight : maxHeight;
          });

          this.setState({
            isLoaded: true,
            data: result.data,
            maxHeight,
            levelChilds
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

  getChildsCount(tree, level = 0, levelCount = {}) {

    if (tree.children.length > 0) {

      levelCount[level] = levelCount.hasOwnProperty(level) ? tree.children.length + levelCount[level] : tree.children.length;

      tree.children.forEach(c => {
        this.getChildsCount(c, level + 1, levelCount);
      });
    }

    return levelCount;
  }

  handleNodeClick(event, nodeKey) {
    this.setState({
      selectedPerson: nodeKey,
      showEdit: true
    });
  }

  render() {
    const { error, isLoaded, data, width, height, selectedPerson, showEdit, maxHeight, levelChilds } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <div className={'custom-container'}>
          <Grid container direction="row"
            justifyContent="center"
            alignItems="stretch">

            <div className={'text-link'}>
              <h3>{data.name}</h3>
              {levelChilds['0'] > 0 && <div> Anak: {levelChilds['0']}</div>}
              {levelChilds['1'] > 0 && <div> Cucu: {levelChilds['1']}</div>}
              {levelChilds['2'] > 0 && <div> Cicit: {levelChilds['2']}</div>}
              {levelChilds['3'] > 0 && <div> Anak Cicit: {levelChilds['3']}</div>}
              {levelChilds['4'] > 0 && <div> Cucu Cicit: {levelChilds['4']}</div>}
              {levelChilds['5'] > 0 && <div> Cicit Cicit: {levelChilds['5']}</div>}
            </div>
            <Tree
              data={data}
              nodeShape="circle"
              svgProps={{
                className: 'custom'
              }}
              gProps={{
                onClick: this.handleNodeClick
              }}
              keyProp={'id'}
              height={height > maxHeight ? height : maxHeight}
              width={width - 360} />
            {showEdit && <PersonEdit idPerson={selectedPerson} onClosed={() => this.setState({ showEdit: false })}></PersonEdit>}

          </Grid>

        </div>


      );
    }
  }
}

export default FamilyTree;