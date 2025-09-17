'use client';

import {
  Drawer,
  Portal,
  CloseButton,
  Button,
} from '@chakra-ui/react';
import { RefObject } from 'react';
import { useSlider } from '@/app/providers/SliderContext';

type SliderProps = {
  containerRef: RefObject<HTMLDivElement | null>;
};

const Slider = ({ containerRef }: SliderProps) => {
  const { isOpen, closeSlider } = useSlider();

  if (!containerRef.current) return null;

  return (
    <Drawer.Root open={isOpen} placement="start">
      <Portal container={containerRef}>
        <Drawer.Backdrop pos="absolute" boxSize="full" />
        <Drawer.Positioner pos="absolute" boxSize="full">
          <Drawer.Content
            bg="gray.800"
            maxW="80%"
            h="100%"
            boxShadow="lg"
            borderRight="1px solid #4A5568"
          >
            <Drawer.Header display="flex" justifyContent="space-between">
              <Drawer.Title color="white">Menu</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" onClick={closeSlider} />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>
              <Button variant="outline" colorPalette={'red'} colorScheme="red">
                Sign Out
              </Button>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Slider;
