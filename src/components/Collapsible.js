import React, { Component } from 'react';

export default class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  togglePanel(e) {
    const { courseClicked, bootcampClicked } = this.props;

    if (bootcampClicked && this.state.open) {
      return;
    }
    if (courseClicked && this.state.open) {
      return;
    }
    this.setState({ open: !this.state.open });
  }

  onClick = (e) => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div>
        <div onClick={this.onClick}>
          {this.props.title} <br /> Cost: {this.props.cost}
        </div>
        {this.state.open ? (
          <div className="content">{this.props.children}</div>
        ) : null}
      </div>
    );
  }
}
