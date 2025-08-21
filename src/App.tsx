import React from 'react';
import './App.scss';
import { Clock } from './Clock';

type State = {
  timerNameId: number;
  visible: boolean;
  clockName: string;
};

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

/* eslint-disable */
export class App extends React.Component<{}, State> {
  state: State = {
    visible: true,
    timerNameId: 0,
    clockName: 'Clock-0',
  };

  handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ visible: false });
  };

  handleLeftClick = () => {
    this.setState({ visible: true });
  };

  componentDidMount() {
    const timerNameId = window.setInterval(() => {
      this.setState(prevState => {
        const newName = getRandomName();
        console.warn(`Renamed from ${prevState.clockName} to ${newName}`);
        return { clockName: newName };
      });
    }, 3300);

    this.setState({ timerNameId });

    document.addEventListener('click', this.handleLeftClick);
    document.addEventListener('contextmenu', this.handleRightClick);
  }

  componentWillUnmount() {
    window.clearInterval(this.state.timerNameId);
    document.removeEventListener('click', this.handleLeftClick);
    document.removeEventListener('contextmenu', this.handleRightClick);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        {this.state.visible && (
          <Clock key={this.state.clockName} name={this.state.clockName} />
        )}
      </div>
    );
  }
}
