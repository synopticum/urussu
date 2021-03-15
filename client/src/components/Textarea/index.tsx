import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import { v4 as uuidv4 } from 'uuid';

type LabelPosition = 'top' | 'right' | 'bottom' | 'left';
type StyledTextAreaProps = { labelPosition: LabelPosition };

const getLabelPosition = ({ labelPosition }: StyledTextAreaProps): string => {
  const map = {
    top: 'column',
    right: 'row',
    bottom: 'column-reverse',
    left: 'row-reverse',
  };

  return map[labelPosition];
};

const getLabelMargin = ({ labelPosition }: StyledTextAreaProps): string => {
  const map = {
    top: '0 0 4px 0',
    right: '0 4px 0 0',
    bottom: '4px 0 0 0',
    left: '0 0 0 4px',
  };

  return map[labelPosition];
};

const StyledTextarea = styled.div`
  display: inline-flex;
  flex-direction: ${getLabelPosition};
  margin: ${getLabelMargin};
`;

const TargetTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  color: ${theme.colors.black.a};
  outline: none;
  transition: border-color 0.3s, background-color 0.3s, opacity 0.3s;
  border: 1px dashed ${theme.colors.white.b};

  &::placeholder {
    color: ${theme.colors.white.c};
    font-style: italic;
    opacity: 1;
    transition: opacity 0.3s;
  }

  &:focus {
    background-color: ${theme.colors.yellow.a};

    &::placeholder {
      opacity: 0;
    }
  }

  &::selection {
    color: ${theme.colors.white.a};
    background-color: ${theme.colors.black.a};
  }

  &:disabled {
    opacity: 0.3;
  }

  .loading {
    color: ${theme.colors.white.b};
    background-image: repeating-linear-gradient(-45deg, #eaeaea, #eaeaea 11px, #fff 10px, #fff 20px);
    background-size: 28px 28px;
    animation: move 0.5s linear infinite;
    resize: none;

    &::placeholder {
      color: ${theme.colors.white.b};
    }
  }

  &:required {
    border-color: ${theme.colors.red.a};

    &::selection {
      color: ${theme.colors.white.a};
      background-color: ${theme.colors.red.a};
    }
  }

  @keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 28px 0;
    }
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
  color: ${theme.colors.black.b};
`;

export type Props = {
  onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  labelPosition?: LabelPosition;
  className?: string;
};

const Textarea: React.FC<Props> = props => {
  const inputId = uuidv4();
  const { className, label, labelPosition = 'top', value = '' } = props;

  return (
    <StyledTextarea className={className} labelPosition={labelPosition}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <TargetTextarea {...props} />
    </StyledTextarea>
  );
};

export default Textarea;
