
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { G, Path, Svg } from 'react-native-svg';
import type { Lesson } from '../types/lessons';
import { PathImages } from '../utils/images';

export default function PathItem (props: {
  lesson: Lesson;
}) {
  const size = 80;
  const padding = 4;
  const sizeWithPadding = size + padding * 2;
  const iconSize = 50;
  const initialAngle = 135;

  const steps = props.lesson.steps[0];
  const completedSteps = 1;

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
    const step = 360 / steps;
    const paths = [];
    for (let i = 0; i < steps; i++) {
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
    const step = 360 / steps;
    const paths = [];
    for (let i = 0; i < completedSteps; i++) {
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
    <TouchableOpacity>
      <Svg width={sizeWithPadding} height={sizeWithPadding}>
        <G>
          {backgroundPath()}
          {filledPath()}
        </G>
      </Svg>
      <View style={{
        position: 'absolute',
        width: sizeWithPadding,
        height: sizeWithPadding,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image source={PathImages[props.lesson.icon]} style={{ width: iconSize, height: iconSize }} />
      </View>
      <View style={{
        position: 'absolute',
        left: size - 20,
        top: size - 20,
      }}>
        <Image source={require('../assets/icons/explosion.png')} style={{ width: 24, height: 24 }} />
      </View>
      <Text style={{ textAlign: 'center', marginTop: 4 }}>{props.lesson.title}</Text>
    </TouchableOpacity>
  );
}