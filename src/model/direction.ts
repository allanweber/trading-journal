import { TrendingDown, TrendingUp } from 'lucide-react';

export enum Direction {
  Long = 'LONG',
  Short = 'SHORT',
}

export const directions = [
  {
    direction: Direction.Long,
    icon: TrendingUp,
    color: 'green',
  },
  {
    direction: Direction.Short,
    icon: TrendingDown,
    color: 'red',
  },
];
