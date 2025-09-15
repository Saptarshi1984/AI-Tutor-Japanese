'use client'

import { forwardRef, useRef } from "react"
import { Button, CloseButton, Drawer, type StackProps, Stack, Portal, Text } from "@chakra-ui/react";
import UserIcon from "./UserIcon";



const DrawerContainer = forwardRef<HTMLDivElement, StackProps>(
  function DrawerContainer(props, ref) {
    return (
      <Stack
         pos="relative"
        overflow="hidden"
        align="flex-start"
        p="8"
        minH="400px"
        layerStyle="fill.subtle"
        outline="2px solid gray"
        ref={ref}
        {...props}
      />
    )
  },
)

const Slider = () => {
  const portalRef = useRef<HTMLDivElement | null>(null)
  return (
    <div>
    <Drawer.Root closeOnInteractOutside={false} placement={'start'}>
      <DrawerContainer ref={portalRef}>        
        <Drawer.Trigger asChild>          
        <Button variant="outline" size="sm" bg="bg"><span><UserIcon /></span></Button>              
        </Drawer.Trigger>
      </DrawerContainer>
      <Portal container={portalRef}>
        <Drawer.Backdrop pos="absolute" boxSize="full" />
        <Drawer.Positioner pos="absolute" boxSize="full">
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
    </div>
  );
};

export default Slider;
