"use client";

import { ProgressCircle } from "@chakra-ui/react";

type LoadingProps = {
  show: boolean;
};

const Loading = ({ show }: LoadingProps) => {
  if (!show) return null;
  return (
    <>
      <div className="absolute left-[45%] top-[45%]">
        <ProgressCircle.Root value={null} colorPalette={"cyan"}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
          <ProgressCircle.ValueText />
        </ProgressCircle.Root>
      </div>
    </>
  );
};

export default Loading;
