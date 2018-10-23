import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, decorate } from 'mobx';
import {
  FirstContainer,
  SecondContainer,
  TitleInput,
  InputContainer,
  CreateBtn,
  PostTable
} from './HomeStyle';

type Props = {
  rootStore: Object
};

type ObservableState = {
  isLoading: boolean
};

class Home extends Component<Props> {
  observableState: ObservableState = {
    isLoading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const {
      rootStore: { postStore }
    } = this.props;
    postStore.fetchPosts({
      body: {},
      success: () => {
        this.observableState.isLoading = false;
      },
      error: () => {
        this.observableState.isLoading = false;
      }
    });
  };

  render() {
    const {
      rootStore: { postStore }
    } = this.props;
    return (
      <Fragment>
        <div
          style={{
            marginBottom: 20,
            paddingBottom: 5,
            borderBottom: '5px solid #000',
            width: '60%',
            fontWeight: 'bolder',
            fontSize: 25
          }}
        >
          HOME
        </div>
        <div>
          <FirstContainer>
            <div style={{ paddingBottom: 15 }}>Create Post</div>
            <InputContainer>
              <div>Author:</div>
              <TitleInput type="text" style={{ width: '50%' }} />
            </InputContainer>
            <InputContainer>
              <div>Title:</div>
              <TitleInput type="text" />
            </InputContainer>
            <InputContainer>
              <div>Content:</div>
              <textarea
                rows={10}
                cols={10}
                style={{
                  width: '100%',
                  resize: 'none',
                  padding: 10,
                  outline: 'none'
                }}
              />
            </InputContainer>
            <InputContainer>
              <CreateBtn>CREATE</CreateBtn>
            </InputContainer>
          </FirstContainer>
          <SecondContainer>
            <div style={{ paddingBottom: 25 }}>Latest Posts</div>
            <PostTable>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th>Author</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {postStore.posts.map(each => (
                  <tr>
                    <td>{each.author}</td>
                    <td>{each.title}</td>
                  </tr>
                ))}
              </tbody>
            </PostTable>
          </SecondContainer>
        </div>
      </Fragment>
    );
  }
}

decorate(Home, {
  observableState: observable,
  fetchData: action
});

export default inject('rootStore')(observer(Home));
