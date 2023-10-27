import { Direction, getDirection } from '@/model/direction';

export default function DirectionDisplay({
  direction,
}: {
  direction: Direction;
}) {
  const directionEntry = getDirection(direction);
  return (
    <>
      {directionEntry && (
        <div className="flex flex-row items-center">
          <directionEntry.icon
            color={directionEntry.color}
            className="mr-1 h-4 w-4"
          />
          <span>{directionEntry.direction}</span>
        </div>
      )}
    </>
  );
}
