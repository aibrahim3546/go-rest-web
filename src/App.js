// @flow
import React, { Component, Fragment } from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  padding: 30px 50px;
`;

type Props = {
  children: Node
};

class App extends Component<Props> {
  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <TopBarContainer>{this.props.children}</TopBarContainer>
      </Fragment>
    );
  }
}

export default App;
