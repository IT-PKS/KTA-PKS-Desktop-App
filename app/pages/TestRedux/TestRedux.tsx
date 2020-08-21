import React from 'react';
import { styled } from 'components/base';
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
  padding: ${p => p.theme.spacing.m}px;
`;

const ClockContainer = styled.div`
  margin-bottom: ${p => p.theme.spacing.m}px;
`;

const Clock = styled.div`
  padding: ${p => p.theme.spacing.m}px;
  display: inline-block;
  color: #000;
  font: 50px menlo, monaco, monospace;
  background-color: #ddd;
`;

const CountContainer = styled.div`
  margin-bottom: ${p => p.theme.spacing.m}px;
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
    const hour = new Date(timestamp).getHours();
    const minute = new Date(timestamp).getMinutes();
    const second = new Date(timestamp).getSeconds();

    const prefixed = (time: number) => {
      let newTime = String(time);
      if (newTime.length < 2) {
        newTime = '0' + newTime;
      }
      return newTime;
    };

    return `${prefixed(hour)}:${prefixed(minute)}:${prefixed(second)}`;
  };

  return (
    <Wrapper>
      <ClockContainer>
        <Clock>{format(lastUpdate)}</Clock>
      </ClockContainer>

      {/* Counter */}
      <CountContainer>
        <strong>Count: {count}</strong>
      </CountContainer>

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
