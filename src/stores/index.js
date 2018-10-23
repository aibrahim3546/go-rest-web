// @flow

import { types } from 'mobx-state-tree';
import PostStore from './PostStore';

const RootStore = types.model('RootStore', {
  postStore: types.optional(PostStore, {})
});

const rootStore = RootStore.create({});

export default rootStore;
