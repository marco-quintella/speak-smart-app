
import { Box, Button, Image, Text, View } from 'native-base';
import { GestureResponderEvent } from 'react-native';
import { G, Path, Svg, SvgUri } from 'react-native-svg';
import type { Level, Unit } from '../types';
import { SkillIconUrl } from '../utils';
import { capitalize } from '../utils/strings';

export default function PathItem (props: {
  unit: Unit;
  level: Level;
  onPress?: ((event: GestureResponderEvent) => void);
}) {
  const size = 80;
  const padding = 4;
  const sizeWithPadding = size + padding * 2;
  const iconSize = 50;
  const initialAngle = 135;

  const totalSessions = props.level.totalSessions ?? 0;
  const finishedSessions = 0;

  function polarToCartesian (centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  function circlePath (x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    var start = polarToCartesian(x, y, radius, endAngle * 0.9999 + initialAngle);
    var end = polarToCartesian(x, y, radius, startAngle + initialAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(' ');
  }

  const backgroundPath = () => {
    const step = 360 / totalSessions;
    const paths = [];
    for (let i = 0; i < totalSessions; i++) {
      paths.push(<Path
        key={i}
        d={circlePath(sizeWithPadding / 2, sizeWithPadding / 2, size / 2, i * step + 10, (i + 1) * step - 10)}
        stroke='gainsboro'
        strokeWidth={8}
        strokeLinecap='round'
        strokeDasharray={[0, 0]}
        fill='transparent'
      />);
    }
    return paths;
  };

  const filledPath = () => {
    const step = 360 / totalSessions;
    const paths = [];
    for (let i = 0; i < finishedSessions; i++) {
      paths.push(<Path
        key={i}
        d={circlePath(sizeWithPadding / 2, sizeWithPadding / 2, size / 2, i * step + 10, (i + 1) * step - 10)}
        stroke='dodgerblue'
        strokeWidth={8}
        strokeLinecap='round'
        strokeDasharray={[0, 0]}
        fill='transparent'
      />);
    }
    return paths;
  };

  return (
    <Box alignItems='center' mt={props.level.index === 0 ? 4 : 0}>
      <Svg width={sizeWithPadding} height={sizeWithPadding}>
        <G>
          {backgroundPath()}
          {filledPath()}
        </G>
      </Svg>
      <View
        w={sizeWithPadding}
        h={sizeWithPadding}
        position='absolute'
        justifyContent='center'
        alignItems='center'
      >
        <Button
          rounded='full'
          w={16}
          h={16}
          onPress={props.onPress}
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <SvgUri uri={SkillIconUrl} style={{ width: iconSize, height: iconSize }} />
        </Button>
        <View
          style={{
            position: 'absolute',
            left: size - 20,
            top: size - 20,
          }}>
          <Image alt='Streak Icon' source={require('../assets/icons/explosion.png')} style={{ width: 24, height: 24 }} />
        </View>
      </View>
      <Text style={{ textAlign: 'center', marginTop: 4 }}>{capitalize(props.level.teachingObjective, { start: true })}</Text>
    </Box>
  );
}