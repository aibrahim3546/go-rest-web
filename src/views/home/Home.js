import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, decorate } from 'mobx';
import { Link } from 'react-router-dom';
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
  isLoading: boolean,
  isCreated: boolean
};

type PostState = {
  author: string,
  title: string,
  content: string
};

class Home extends Component<Props> {
  observableState: ObservableState = {
    isLoading: true,
    isCreated: false
  };

  postState: PostState = {
    author: '',
    title: '',
    content: ''
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

  onCreatePost = () => {
    const {
      rootStore: { postStore }
    } = this.props;
    const { author, title, content } = this.postState;

    const checkValidation = () => {
      if (author && title && content) {
        return true;
      }
      return false;
    };

    this.observableState.isCreated = true;
    if (checkValidation()) {
      this.observableState.isCreated = false;
      postStore.createPost({
        body: this.postState,
        success: () => {
          this.postState.author = '';
          this.postState.title = '';
          this.postState.content = '';
        },
        error: () => {}
      });
    }
  };

  render() {
    const {
      rootStore: { postStore }
    } = this.props;
    const { isCreated } = this.observableState;
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
              <TitleInput
                type="text"
                style={{ width: '50%' }}
                onChange={e => {
                  this.postState.author = e.target.value;
                }}
                value={this.postState.author}
              />
              <div style={{ color: 'red', fontSize: 12, height: 14.5 }}>
                {isCreated &&
                  !this.postState.author &&
                  'Author field is required'}
              </div>
            </InputContainer>
            <InputContainer>
              <div>Title:</div>
              <TitleInput
                type="text"
                onChange={e => {
                  this.postState.title = e.target.value;
                }}
                value={this.postState.title}
                style={{ fontSize: 20 }}
              />
              <div style={{ color: 'red', fontSize: 12, height: 14.5 }}>
                {isCreated &&
                  !this.postState.title &&
                  'Title field is required'}
              </div>
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
                  outline: 'none',
                  fontSize: 18
                }}
                onChange={e => {
                  this.postState.content = e.target.value;
                }}
                value={this.postState.content}
              />
              <div style={{ color: 'red', fontSize: 12, height: 14.5 }}>
                {isCreated &&
                  !this.postState.content &&
                  'Content field is required'}
              </div>
            </InputContainer>
            <InputContainer>
              <CreateBtn onClick={this.onCreatePost}>CREATE</CreateBtn>
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
                  <tr key={each.id}>
                    <td>{each.author}</td>
                    <td>
                      <Link to={`/post/${each.id}`}>{each.title}</Link>
                    </td>
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
  postState: observable,
  fetchData: action,
  onCreatePost: action
});

export default inject('rootStore')(observer(Home));
