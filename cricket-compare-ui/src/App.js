import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Spin, Divider, Dropdown, Menu, Row, Col, Button, List } from 'antd';
import "antd/dist/antd.css";
import './App.css';
import { render } from 'react-dom';

const GET_PLAYERS = gql`
  {
    players {
      id,
      name,
      team,
      age,
      battingStyle,
      bowlingStyle,
      matches,
      runs,
      battingInnings,
      hundreds,
      fifties,
      fours,
      sixes,
      SR,
      bowlingInnings,
      balls,
      economy,
      wickets
  }
  }
`;


const App = () => (
  <Query query={GET_PLAYERS}>
    {({ data: { players }, loading }) => {
      if (loading || !players) {
        return <div><Spin /></div>;
      }

      return (
        <Compare players={players} />
      );
    }}
  </Query>
);

class Compare extends React.Component {

  constructor(props){
    super(props);
    console.log(props)
    this.handleP1Click = this.handleP1Click.bind(this);
    this.handleP2Click = this.handleP2Click.bind(this);
  this.state = {
    p1Data: this.emptyObject,
    p2Data: this.emptyObject
  }};

  emptyObject = {
    "id":null,
    "name":null,
    "team":null,
    "age":null,
    "battingStyle":null,
    "bowlingStyle":null,
    "matches":null,
    "runs":null,
    "battingInnings":null,
    "hundreds":null,
    "fifties":null,
    "fours":null,
    "sixes":null,
    "SR":null,
    "bowlingInnings":null,
    "balls":null,
    "economy":null,
    "wickets":null
  };

  handleP1Click = e => {
    console.log(this.props)
    var val = this.props.players.find(function(element) {
      return element.id == e.key;
    })
    var objCopy = JSON.parse(JSON.stringify(val))
    delete objCopy.id
    delete objCopy.__typename
    this.setState({
      p1Data: objCopy
    })
    
}
  handleP2Click = e => {
    var val = this.props.players.find(function(element) {
      return element.id == e.key;
    })
    var objCopy = JSON.parse(JSON.stringify(val))
    delete objCopy.id
    delete objCopy.__typename
    this.setState({
      p2Data: objCopy
    })
}
    menu1 = (
      <Menu onClick={this.handleP1Click}>
      {
        this.props.players.map((item,index) => (
          <Menu.Item key={item.id}>
            <a>
            {item.name}
            </a> 
          </Menu.Item>
        ))
      }
      </Menu>
    )
  
     menu2 = (
      <Menu onClick={this.handleP2Click}>
      {
        this.props.players.map((item,index) => (
          <Menu.Item key={item.id}>
            <a>
            {item.name}
            </a> 
          </Menu.Item>
        ))
      }
      </Menu>
    )


  render() {

    var cols = JSON.parse(JSON.stringify(this.props.players[0]));
    delete cols.id;
    delete cols.__typename;

    console.log(this.props)

    return (
      <React.Fragment>
      <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
        Player Stats
      </Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={6} offset={6}>
          <Dropdown overlay={this.menu1}>
            <Button>Player 1</Button>
            </Dropdown>
        </Col>
        <Col className="gutter-row" span={6}>
          <Dropdown overlay={this.menu2}>
            <Button>Player 2</Button>
            </Dropdown>
        </Col>
      </Row>
      <Row>
      <Col className="gutter-row" span={6}>
        <List bordered column={1} layout={"vertical"}>
        {Object.keys(cols).map((key, index) => (
                <List.Item label={key} span={1}>{key}</List.Item>
            ))}
        </List>
        </Col>
      <Col span={6}>
      <List bordered column={1} layout={"vertical"}>
            {Object.keys(this.state.p1Data).map((key, index) => (
                <List.Item label={key} span={1}>{this.state.p1Data[key]}</List.Item>
            ))}
        </List>
      </Col>
      <Col span={6}>
      <List bordered column={1} layout={"vertical"}>
            {Object.keys(this.state.p2Data).map((key, index) => (
                <List.Item label={key} span={1}>{this.state.p2Data[key]}</List.Item>
            ))}
        </List>
      </Col>
      </Row>
      </React.Fragment>
    );
  }
}


export default App;
