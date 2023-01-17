import { Box, Center, Flex, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { PathItem } from '~/components';
import type { Level, Unit } from '~/types';
import { capitalize, fetchLevelsByUnit } from '~/utils';

export default function UnitHeader ({ unit }: { unit: Unit; }) {
  const [levels, setLevels] = useState<Level[]>([]);

  async function getLevels () {
    const data = await fetchLevelsByUnit(unit.id);
    if (data) setLevels(data);
  }

  useEffect(() => {
    getLevels();
  }, []);

  function levelsStructure () {
    return levels.map((l, index) => <PathItem key={l.id} level={l} unit={unit} />);
  }

  return (
    <VStack>
      <Box p={4} w='100%' flexDirection='row' justifyContent='space-between' bg='secondary.500'>
        <Flex flex={1} flexDirection='column'>
          <Text fontSize='xl' fontWeight='bold' color='white'>Unidade {(unit.unitIndex + 1).toString().padStart(2, '0')}</Text>
          <Text fontSize='md' color='white'>{capitalize(unit.teachingObjective, { start: true })}</Text>
        </Flex>
        <Center></Center>
      </Box>
      <VStack px={4}>
        <Center>
          {levelsStructure()}
        </Center>
      </VStack>
    </VStack>
  );
}