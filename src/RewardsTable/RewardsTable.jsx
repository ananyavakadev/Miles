import React from 'react';
import Draggable from 'react-draggable';

export class RewardsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rewardStates: [],
            rewardStateIndex: null,
            rowDragIndex: null,
            cIdDragStart: null,
            colDropIndex: null
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
        this.onDrag = this.onDrag.bind(this);

        this.colRef = React.createRef();

        this.colMidPoints = [];
        this.colPositions = [];
    }

    componentWillReceiveProps(props) {
        if (props.rewards && props.rewards.length) {
            this.setState({
                rewardStates: [this.clone(props.rewards)],
                rewardStateIndex: 0
            });
        }
    }

    clone(rewards) {
        return JSON.parse(JSON.stringify(rewards));
    }

    save() {
        const rewards = this.clone(this.state.rewardStates[this.state.rewardStateIndex]);
        this.props.onSave(rewards);
        this.setState({
            rewardStates: [this.clone(rewards)],
            rewardStateIndex: 0
        });
    }

    cancel() {
        this.setState({
            rewardStates: [this.clone(this.props.rewards)],
            rewardStateIndex: 0
        });
    }

    remove(rIndex, cId) {
        const rewards = this.clone(this.state.rewardStates[this.state.rewardStateIndex]);
        rewards[rIndex].categories[cId] = false;
        this.setState({
            rewardStates: this.state.rewardStates.concat([rewards]),
            rewardStateIndex: this.state.rewardStateIndex + 1
        });
    }

    add(rIndex, cId) {
        const rewards = this.clone(this.state.rewardStates[this.state.rewardStateIndex]);
        rewards[rIndex].categories[cId] = true;
        this.setState({
            rewardStates: this.state.rewardStates.concat([rewards]),
            rewardStateIndex: this.state.rewardStateIndex + 1
        });
    }

    redo() {
        this.setState({rewardStateIndex: this.state.rewardStateIndex + 1});
    }

    undo() {
        this.setState({rewardStateIndex: this.state.rewardStateIndex - 1});
    }

    onDragStart(rIndex, cIdStart, cIndex) {
        if (!this.colMidPoints.length) {
            this.colPositions= [];
            this.colMidPoints = [];
            let sum = 0;
            for(let col of this.colRef.current.children) {
                this.colPositions.push(sum);
                this.colMidPoints.push((col.offsetWidth/2) + sum);
                sum += col.offsetWidth;
            }
        }
        this.setState({
            rowDragIndex: rIndex, 
            cIdDragStart: cIdStart, 
            initX: this.colPositions[cIndex + 1],
            offsetX: 0
        });
    }

    onDragStop() {
        if (this.state.colDropIndex) {
            const cId = this.props.categories[this.state.colDropIndex - 1].id;
            if (cId !== this.state.cIdDragStart) {
                this.add(this.state.rowDragIndex, cId);
                if (this.state.cIdDragStart) {
                    this.remove(this.state.rowDragIndex, this.state.cIdDragStart);
                }
            }
        }
        this.setState({
            rowDragIndex: null, 
            cIdDragStart: null, 
            colDropIndex: null, 
            offsetX: 0
        });
        return true;
    }

    onDrag(event, ui) {
        this.setState({offsetX: ui.x});
        const pos = ui.x + this.state.initX;
        let colIndex = pos < this.colMidPoints[0] ? 0 : this.colMidPoints.findIndex(x => x >= this.state.initX + ui.x );
        this.setState({colDropIndex: colIndex});
    }

    render() {
        const { categories } = this.props;
        const { rewardStateIndex, rewardStates, rowDragIndex, cIdDragStart, colDropIndex, offsetX } = this.state;
        const rewards = rewardStates[rewardStateIndex];
        return (
            <div>
                <div className="actions">
                    <button className="btn btn-default" disabled={rewardStateIndex === 0} onClick={this.undo}>
                        <span style={{transform: 'scaleX(-1)'}} className="glyphicon glyphicon-share-alt"></span>Undo
                    </button>
                    <button className="btn btn-default" disabled={rewardStateIndex === rewardStates.length - 1} onClick={this.redo}>
                        <span className="glyphicon glyphicon-share-alt"></span>Redo
                    </button>
                </div>
                <table className="table table-bordered table-fixed">
                    <thead>
                        <tr>
                            <th colSpan={1}>Rewards</th>
                            <th colSpan={categories.length}>Categories</th>
                        </tr>
                        <tr ref={this.colRef}>
                            <th></th>
                            {
                                categories.map(function(c) {
                                    return ( <th key={c.id}>{c.name}</th> )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rewards && rewards.map(function(r, rIndex) {
                                return (
                                    <tr key={r.id}>
                                        <Draggable axis="x" 
                                        onStart={() => {this.onDragStart(rIndex, null, -1)}}
                                        onStop={this.onDragStop}
                                        onDrag={this.onDrag}
                                        position={{x: 0, y: 0}}
                                        bounds="parent">
                                            <td>
                                                {rIndex === rowDragIndex && cIdDragStart === null &&
                                                    <div className="flex-box clone"
                                                    style={{transform: 'translate(-' + offsetX + 'px, 0px)'}}>{r.name}</div>
                                                }
                                                <div className="flex-box">{r.name}</div>
                                            </td>
                                        </Draggable>
                                            
                                        {
                                            categories.map(function(c, cIndex) {
                                                return (
                                                    <Draggable axis="x" key={r.id + c.id}
                                                    onStart={() => {this.onDragStart(rIndex, c.id, cIndex)}}
                                                    onStop={this.onDragStop}
                                                    onDrag={this.onDrag}
                                                    position={{x: 0, y: 0}}
                                                    bounds="parent">
                                                        <td id={c.id} 
                                                        className={colDropIndex - 1 === cIndex && rowDragIndex === rIndex && cIdDragStart !== c.id ? 'drag' : ''}>
                                                            {r.categories[c.id] ?
                                                                <div>
                                                                    <div className="remove">
                                                                        <span onClick={() => this.remove(rIndex, c.id)}>x</span>
                                                                    </div>
                                                                    <div className="flex-box"><span>{r.name}</span></div>
                                                                </div>
                                                                :
                                                                <div className="empty">&nbsp;</div>
                                                            }
                                                        </td>
                                                    </Draggable>
                                                )     
                                            }, this)
                                        }
                                    </tr>
                                )
                            }, this)
                        }
                    </tbody>
                </table>
                <div className="actions">
                    <button className="btn btn-default main" disabled={rewardStateIndex === 0} onClick={this.cancel}>
                        <span class="glyphicon glyphicon-remove"></span>Cancel
                    </button>
                    <button className="btn btn-success main" disabled={rewardStateIndex === 0} onClick={this.save}>
                    <span class="glyphicon glyphicon-ok"></span>Save
                    </button>
                </div>
            </div>
        );
    }
}