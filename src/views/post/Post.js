// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { observable, decorate } from 'mobx';

import { CreateBtn } from '../home/HomeStyle';
import { TextArea } from './PostStyle';

type Props = {
  rootStore: Object,
  match: {
    params: {
      id: string
    }
  },
  history: Object
};

type ObservableState = {
  titleHeight: number,
  contentHeight: number,
  isLoading: boolean
};

type PostState = {
  title: string,
  content: string
};

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 0 15px;
  margin: auto;
`;

class Post extends Component<Props> {
  observableState: ObservableState = {
    titleHeight: 0,
    contentHeight: 0,
    isLoading: true
  };

  postState: PostState = {
    content: '',
    title: ''
  };

  componentDidMount() {
    const {
      rootStore: { postStore },
      match
    } = this.props;
    const {
      params: { id }
    } = match;
    postStore.fetchPost({
      body: {
        id
      },
      success: () => {
        this.postState.title = postStore.post.title;
        this.postState.content = postStore.post.content;
        this.observableState.isLoading = false;
        setTimeout(() => {
          this.observableState.titleHeight = this.titleEl.scrollHeight + 5;
          this.observableState.contentHeight = this.contentEl.scrollHeight + 5;
        }, 10);
      },
      error: () => {}
    });
  }

  onDeletePost = () => {
    const {
      rootStore: { postStore },
      history,
      match
    } = this.props;
    const {
      params: { id }
    } = match;
    postStore.deletePost({
      body: {
        id
      },
      success: () => {
        history.push('/');
      },
      error: () => {}
    });
  };

  onEditPost = () => {
    const {
      rootStore: { postStore },
      match
    } = this.props;
    const {
      params: { id }
    } = match;

    postStore.updatePost({
      body: {
        id,
        title: this.postState.title,
        content: this.postState.content
      },
      success: () => {
        this.postState.title = postStore.post.title;
        this.postState.content = postStore.post.content;
        setTimeout(() => {
          this.observableState.titleHeight = this.titleEl.scrollHeight + 5;
          this.observableState.contentHeight = this.contentEl.scrollHeight + 5;
        }, 5);
      },
      error: () => {}
    });
  };

  render() {
    const {
      rootStore: { postStore }
    } = this.props;
    const { post } = postStore;
    const { isLoading } = this.observableState;
    return (
      <Container>
        <div>
          <div
            style={{
              marginBottom: 20,
              paddingBottom: 5,
              borderBottom: '5px solid #000',
              width: '50%',
              fontWeight: 'bolder',
              fontSize: 25,
              display: 'inline-block',
              float: 'left'
            }}
          >
            Post
          </div>
          <div
            style={{
              width: '50%',
              textAlign: 'right',
              display: 'inline-block',
              float: 'left'
            }}
          >
            <div style={{ width: '100%', textAlign: 'right' }}>
              {(this.postState.title !== post.title ||
                this.postState.content !== post.content) && (
                <CreateBtn
                  onClick={this.onEditPost}
                  style={{
                    backgroundColor: 'rgba(255,180,0,0.8)',
                    borderColor: 'rgba(255,180,0,1)',
                    margin: '0 0 0 auto'
                  }}
                >
                  SAVE
                </CreateBtn>
              )}
            </div>
          </div>
        </div>
        {(!isLoading || Boolean(this.postState.title) )&& (
          <TextArea
            defaultValue={this.postState.title.toUpperCase()}
            height={this.observableState.titleHeight}
            innerRef={el => {
              this.titleEl = el;
            }}
            maxLength={255}
            style={{ textTransform: 'uppercase' }}
            onChange={e => {
              this.postState.title = e.target.value;
            }}
          />
        )}
        
        {(!isLoading || Boolean(this.postState.content))&& (
            <TextArea
              defaultValue={this.postState.content}
              height={this.observableState.contentHeight}
              innerRef={el => {
                this.contentEl = el;
              }}
              onChange={e => {
                this.postState.content = e.target.value;
              }}
            />
          )}

        <div style={{ color: '#999', marginBottom: 20 }}>
          <div>{post.author}</div>
          <div>{post.createdAt}</div>
        </div>
        <CreateBtn
          onClick={this.onDeletePost}
          style={{
            backgroundColor: 'rgba(255,0,0,0.8)',
            borderColor: 'rgba(255,0,0,1)'
          }}
        >
          DELETE
        </CreateBtn>
      </Container>
    );
  }
}

decorate(Post, {
  observableState: observable,
  postState: observable
});

export default withRouter(inject('rootStore')(observer(Post)));
