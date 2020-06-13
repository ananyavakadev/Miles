import React from 'react';
import { connect } from 'react-redux';
import { rewardsActions } from '../_actions';
import { RewardsTable } from '../RewardsTable';
import './App.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.saveRewards = this.saveRewards.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(rewardsActions.getRewardsConfig());
    }

    saveRewards(rewards) {
        this.props.dispatch(rewardsActions.saveRewardsData(rewards));
    };

    render() {
        const { rewards, categories } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        { rewards && categories &&
                            <RewardsTable 
                            rewards={rewards} 
                            categories={categories}
                            onSave={this.saveRewards}
                            ></RewardsTable>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { rewards, categories } = state;
    return { rewards, categories };
}

const connectedApp = connect(mapState)(App);
export { connectedApp as App };