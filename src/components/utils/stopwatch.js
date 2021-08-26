import React, { Component } from 'react';

export default class StopWatch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dd: 0,
            hh: 0,
            mm: 0,
            ss: 0,
            timerID: 0,
            isRunning: false
        };

        this.initData(props.totalSeconds)
    }

    initData(totalSeconds) {
        var date = new Date(null);
        date.setHours(0);
        date.setMinutes(0);

        date.setSeconds(totalSeconds);

        this.state.hh = date.getHours() + (24 * (date.getDate() - 1))
        this.state.mm = date.getMinutes()
        this.state.ss = date.getSeconds()
    }

    componentDidMount() {
        if (this.props.isRunning) {
            this.update(true)
        }
    }

    start = () => {
        this.props.changeAction(3)
        .then((result) => {
            this.initData(result.data.work_time)
            this.update(true)
        })
    }

    pause = () => {
        this.props.changeAction(2)
        .then((result) => {
            this.initData(result.data.work_time)
            this.update(false)
        })
    }

    update = (run) => {
        this.setState({
            isRunning: run
        })
        if (!run) {
            // Running => Stop
            clearInterval(this.timerID);
        } else {

            // Stop => Running
            let { dd, hh, mm, ss } = this.state;

            this.timerID = setInterval(() => {
                ss++;
                if (ss >= 60) {
                    mm++;
                    ss = 0;
                }
                if (mm >= 60) {
                    hh++;
                    mm = 0;
                }
                // if (hh >= 24) {
                //     dd++;
                //     hh = 0;
                // }
                this.setState({ dd, hh, mm, ss });
            }, 1000);
        }
    }

    // 1 => 01
    format(num) {
        return (num + '').length === 1 ? '0' + num : num + '';
    }


    render() {
        return (
            <div className="stop-watch" style={{ display: 'flex', marginBottom: 20 }}>
                <div style={{marginRight: 10}}>
                    <span>{this.format(this.state.hh)}</span>:
                    <span>{this.format(this.state.mm)}</span>:
                    <span>{this.format(this.state.ss)}</span>
                </div>
                {
                    !this.state.isRunning ?
                        <button className="control"
                            onClick={this.start}
                        >▶</button>
                    : <></>
                }
                {
                    this.state.isRunning ?
                        <button className="control"
                            onClick={this.pause}
                        >❚❚</button>
                    : <></>
                }
            </div>
        );
    }
}
