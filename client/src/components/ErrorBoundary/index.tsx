import React from 'react';

const DefaultFallback: React.FC = () => null;

type State = { error: Error | null; info: React.ErrorInfo | null; eventId: string | null };

type Props = {
  children: unknown;
  fallback?: React.ComponentType<State & { retry: () => void }>;
  report?: boolean;
};

const initialState: State = { error: null, info: null, eventId: null };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = initialState;

  static defaultProps = {
    fallback: DefaultFallback,
    report: true,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch: (error: null | Error, info: React.ErrorInfo) => void = (error, info) => {
    console.log(error, info);
  };

  reset = (): void => {
    this.setState(initialState);
  };

  render(): React.ReactElement | React.ReactNode {
    const { error, info, eventId } = this.state;
    const { children } = this.props;

    const Fallback = this.props.fallback;

    return error === null ? children : <Fallback error={error} info={info} eventId={eventId} retry={this.reset} />;
  }
}

export default ErrorBoundary;
