"use client";

import { Box, VStack, Text, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ResultsProps = {
  total: number;
  correct: number;
  level: string;
  onReview: () => void;
};

export default function Results({ total, correct, level }: ResultsProps) {
  const r =useRouter();
  const wrong = total - correct;
  const passed = total > 0 && correct / total >= 0.5;
  const [review, setReview] = useState(false);

  const onReview = () => {
    setReview(true);
  };

  return (
    <Box
      position="absolute"
      top={4}
      right={16}
      w="280px"
      bg="gray.900"
      color="white"
      borderWidth="2px"
      borderColor={passed ? "green.400" : "red.400"}
      rounded="xl"
      p={4}
      boxShadow="lg"
      zIndex={20}
    >
      {!review && (
        <VStack align="center" gap={4}>
          <Heading fontSize="lg">Results</Heading>
          <Text fontSize={"1.6rem"} fontWeight="bold">
            Your Level is {level}
          </Text>
          <div className="w-full flex flex-row justify-evenly">
          <Button
            size="sm"
            colorScheme={passed ? "green" : "red"}
            variant="outline"
            colorPalette={"teal"}
            onClick={onReview}
          >
            Review
          </Button>
          <Button
            size="sm"
            colorScheme={passed ? "green" : "red"}
            variant="outline"
            colorPalette={"teal"}
            onClick={() => r.push('/Profile')}
          >
            Exit
          </Button>
          </div>
        </VStack>
      )}
      {review && (
        <VStack align="center">
          <Text w={"full"} fontSize="lg" fontWeight="bold" textAlign={"center"}>
            Test Summary
          </Text>
          <Text color="gray.300">Questions: {total}</Text>
          <Text color="green.300">Correct: {correct}</Text>
          <Text color="red.300">Wrong: {wrong}</Text>
          <Button
            size="sm"
            colorScheme={passed ? "green" : "red"}
            variant="outline"
            colorPalette={"teal"}
            onClick={() => setReview(false)}
          >
            Back
          </Button>
        </VStack>
      )}
    </Box>
  );
}
