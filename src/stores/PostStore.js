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
        req.success();
      } catch (error) {
        console.warn(error);
        req.error();
      }
    })
  }));

export default PostStore;
