import { useState } from "react";
import { Heading, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface LessonCardProps {
  header: string;
  text: string;
  imgSrc?: string;
  btnText: string;  
  url?: string;
}

const LessonCard = ({
  header,
  text,
  btnText,  
  url,
}: LessonCardProps) => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  return (
    <div className="w-90 !m-auto">
      <div className="!m-auto flex flex-row text-gray-300 items-center justify-between">
        <div className="flex flex-col !mt-2">
          <Heading className="!text-[16px]">{header}</Heading>
          <Text className="min-h-2 !text-[12px] text-cyan-600">{text}</Text>
        </div>
        <Button
          onClick={() => {
            if (url) route.push(url);
            setLoading(true);
          }}
          loading={loading}
          size={"xs"}
          variant={"solid"}
          colorPalette={"cyan"}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default LessonCard;
