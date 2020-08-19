import React from 'react';
import styled from '@emotion/styled';
import { PATH } from 'components/contextual/Router';
import { useHistory } from 'react-router-dom';

// Redux
import { ReduxState } from 'kta';
import { connect } from 'react-redux';
import { startClock, incrementCount, decrementCount, resetCount } from 'actions/action_test';

// Utils
import useDidMount from 'utils/hooks/useDidMount';
import useWillUnmount from 'utils/hooks/useWillUnmount';

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

const TestRedux: React.FC<Props> = props => {
  const { dispatch, lastUpdate, count } = props;
  const history = useHistory();
  let timer: NodeJS.Timer | undefined;

  useDidMount(() => {
    dispatch(startClock());
    timer = setInterval(() => {
      dispatch(startClock());
    }, 1000);
  });

  useWillUnmount(() => {
    timer && clearInterval(timer);
  });

  const increment = () => {
    dispatch(incrementCount());
  };

  const decrement = () => {
    dispatch(decrementCount());
  };

  const reset = () => {
    dispatch(resetCount());
  };

  const redirectToHome = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    history.push(PATH.HOME);
  };

  const format = (timestamp: number) => {
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

  return (
    <Wrapper>
      <Clock>{format(lastUpdate)}</Clock>

      {/* Counter */}
      <h1>
        Count: <span>{count}</span>
      </h1>

      <ButtonContainer>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+1</button>
      </ButtonContainer>

      <a href="#" onClick={redirectToHome}>
        Back to Home Page
      </a>
    </Wrapper>
  );
};

export default connect(mapStateToProps)(TestRedux);
