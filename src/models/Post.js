// @flow

import { types } from 'mobx-state-tree';

const Post = types.model('Post', {
  id: 0,
  author: '',
  title: '',
  content: '',
  createdAt: '',
  updatedAt: ''
});

export default Post;
