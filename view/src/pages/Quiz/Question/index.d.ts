import React from 'react';
import {TimeProviderQuestion} from '../../../components/TimeProvider.d';

export type AnswerValue = string | number | boolean;
export type AnswerType = AnswerValue | AnswerValue[] | undefined;

export type AnswerProps = React.PropsWithChildren & {
  question?: TimeProviderQuestion;
  onAnswer?: (answer: { [key: string]: AnswerType }) => void;
};
