import { useContext } from 'react';
import { TimelineContext } from '../context/TimelineContextValue';

export const useTimeline = () => useContext(TimelineContext);