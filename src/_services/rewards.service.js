import { REWARDS_DATA, CATEGORIES_LIST } from "../_constants";

export const rewardsService = {
    getRewardsData, getCategories, saveRewardsData
};

function getRewardsData() {
    const rewards = localStorage.getItem('rewards') ? JSON.parse(localStorage.getItem('rewards')) : [];
    return rewards.length ? rewards : REWARDS_DATA;
}

function getCategories() {
    const categories = localStorage.getItem('categories');
    return categories && categories.length ? categories : CATEGORIES_LIST;
}

function saveRewardsData(rewards) {
    localStorage.setItem('rewards', JSON.stringify(rewards));
}