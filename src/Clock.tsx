import React from 'react';

type Props = {
  name: string;
};

type State = {
  today: Date;
  timerTimeId: number;
};

/* eslint-disable */
export class Clock extends React.Component<Props, State> {
  state: State = {
    today: new Date(),
    timerTimeId: 0,
  };

  componentDidMount(): void {
    const timerTimeId = window.setInterval(() => {
      this.setState({ today: new Date() }, () => {
        console.log(this.state.today.toUTCString().slice(-12, -4));
      });
    }, 1000);

    this.setState({ timerTimeId });
  }

  componentWillUnmount(): void {
    window.clearInterval(this.state.timerTimeId);
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>
        {' time is '}
        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
