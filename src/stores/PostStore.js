// @flow

import { types, flow } from 'mobx-state-tree';
import { Post } from '../models';
import http from '../utils/http';

const PostStore = types
  .model('PostStore', {
    posts: types.optional(types.array(Post), []),
    post: types.optional(Post, {})
  })
  .actions(self => ({
    fetchPosts: flow(function* fetchPosts(req) {
      try {
        const response = yield http.get('/posts');
        const { data } = response;
        self.posts = data.map(each => Post.create(each));
        console.log('RESPONSE HERE ----- ', response);
        req.success();
      } catch (error) {
        console.warn(error);
        req.error();
      }
    }),
    fetchPost: flow(function* fetchPost(req) {
      try {
        const { id } = req.body;
        const response = yield http.get(`/posts/${id}`);
        console.log('RESPONSE HERE ----- ', response);
        const { data } = response;
        self.post = Post.create(data);
        req.success();
      } catch (error) {
        console.warn(error);
        req.error();
      }
    }),
    createPost: flow(function* createPost(req) {
      try {
        const response = yield http.post('/posts', req.body);
        console.log('RESPONSE HERE ----- ', response);
        const { data } = response;
        self.posts.push(Post.create(data));
        req.success();
      } catch (error) {
        console.warn(error);
        req.error();
      }
    }),
    updatePost: flow(function* updatePost(req) {
      try {
        console.log(req.body);
        const response = yield http.patch(`/posts/${req.body.id}`, {
          title: req.body.title,
          content: req.body.content
        });
        console.log('RESPONSE HERE ----- ', response);
        const { data } = response;
        const i = self.posts.findIndex(each => each.id === req.body.id);
        if (i > -1) {
          self.posts[i].title = data;
        }
        req.success();
      } catch (error) {
        console.warn(error);
        req.error();
      }
    }),
    deletePost: flow(function* deletePost(req) {
      try {
        const { id } = req.body;
        const response = yield http.delete(`/posts/${id}`, req.body);
        console.log('RESPONSE HERE ----- ', response);
        const i = self.posts.findIndex(each => each.id === id);
        if (i > -1) {
          self.posts.slice(i, 1);
        }
        req.success();
      } catch (error) {
        console.warn(error);
        req.error();
      }
    })
  }));

export default PostStore;
