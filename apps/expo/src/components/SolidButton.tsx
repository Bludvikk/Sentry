import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import tailwind from 'twrnc';

export const SolidButton = () => {
  const [hovered, setHovered] = useState(false);

  const handleHoverIn = () => {
    setHovered(true);
  };

  const handleHoverOut = () => {
    setHovered(false);
  };

  return (
    <Pressable
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      style={({ pressed }) => [
        tailwind`bg-blue-500 h-12 px-4 items-center justify-center rounded-md`,
        pressed || hovered ? tailwind`bg-blue-700` : null,
      ]}
    >
      <Text style={tailwind`text-white font-bold text-base`}>Button</Text>
    </Pressable>
  );
};