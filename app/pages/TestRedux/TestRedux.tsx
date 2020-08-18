import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { PATH } from 'components/contextual/Router';

// Redux
import { ReduxState } from 'kta';
import { connect } from 'react-redux';
import { startClock, incrementCount, decrementCount, resetCount } from 'actions/action_test';

type OwnProps = {
  dispatch: (action: any) => any;
};

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

const mapStateToProps = (state: ReduxState) => {
  const {
    test: { lastUpdate, count },
  } = state;

  return {
    lastUpdate,
    count,
  };
};

const Wrapper = styled.div`
  padding: 15px;
`;

const Clock = styled.div`
  padding: 15px;
  display: inline-block;
  color: #000;
  font: 50px menlo, monaco, monospace;
  background-color: #ddd;
`;

const ButtonContainer = styled.div`
  margin-bottom: 2rem;

  button {
    margin-right: 4px;

    :last-child {
      margin-right: 0;
    }
  }
`;

class TestRedux extends Component<Props> {
  timer: NodeJS.Timer | undefined;

  componentDidMount() {
    this.props.dispatch(startClock());

    this.timer = setInterval(() => {
      this.props.dispatch(startClock());
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  increment = () => {
    this.props.dispatch(incrementCount());
  };

  decrement = () => {
    this.props.dispatch(decrementCount());
  };

  reset = () => {
    this.props.dispatch(resetCount());
  };

  format = (timestamp: number) => {
    let hour: number | string = new Date(timestamp).getHours();
    let minute: number | string = new Date(timestamp).getMinutes();
    let second: number | string = new Date(timestamp).getSeconds();

    if (String(hour).length < 2) {
      hour = '0' + hour;
    }
    if (String(minute).length < 2) {
      minute = '0' + minute;
    }
    if (String(second).length < 2) {
      second = '0' + second;
    }

    return `${hour}:${minute}:${second}`;
  };

  render() {
    const { lastUpdate, count } = this.props;

    return (
      <Wrapper>
        <Clock>{this.format(lastUpdate)}</Clock>

        {/* Counter */}
        <h1>
          Count: <span>{count}</span>
        </h1>

        <ButtonContainer>
          <button onClick={this.decrement}>-1</button>
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.increment}>+1</button>
        </ButtonContainer>

        <Link to={PATH.HOME}>Back to Home Page</Link>
      </Wrapper>
    );
  }
}

export default connect(mapStateToProps)(TestRedux);
