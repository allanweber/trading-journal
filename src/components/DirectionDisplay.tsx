import { Direction, getDirection } from '@/model/direction';
import { useTranslations } from 'next-intl';

export default function DirectionDisplay({
  direction,
}: {
  direction: Direction;
}) {
  const t = useTranslations('direction');
  const directionEntry = getDirection(direction);
  return (
    <>
      {directionEntry && (
        <div className="flex flex-row items-center">
          <directionEntry.icon
            color={directionEntry.color}
            className="mr-1 h-4 w-4"
          />
          <span>{t(directionEntry.direction)}</span>
        </div>
      )}
    </>
  );
}
