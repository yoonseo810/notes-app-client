import { Skeleton } from '@nextui-org/react';

const NavBarSkeleton = () => {
  return (
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-3/5 rounded-lg" />
      </div>
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
    </div>
  );
};

export default NavBarSkeleton;
