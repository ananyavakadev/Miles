import { ACTION_TYPE } from "../_constants/rewards.constants";
import { rewardsService } from "../_services";

export const rewardsActions = {
    getRewardsConfig, saveRewardsData
};

function getRewardsConfig() {
    return dispatch => {
        const rewards = rewardsService.getRewardsData();
        const categories = rewardsService.getCategories();

        dispatch({type: ACTION_TYPE.REWARDS_DATA, rewards});
        dispatch({type: ACTION_TYPE.CATEGORIES_LIST, categories});
    };
}

function saveRewardsData(rewards) {
    return dispatch => {
        rewardsService.saveRewardsData(rewards);
    };
}