import { ACTION_TYPE } from "../_constants";

export function rewards(state = [], action) {
  switch (action.type) {
      case ACTION_TYPE.REWARDS_DATA:
          return action.rewards;
      default:
          return state
  }
};

export function categories(state = [], action) {
  switch (action.type) {
      case ACTION_TYPE.CATEGORIES_LIST:
          return action.categories;
      default:
          return state
  }
};