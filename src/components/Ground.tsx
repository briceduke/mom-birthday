import { usePlane } from '@react-three/cannon';
import { type FC } from 'react';

const Ground: FC = () => {
    const [ref] = usePlane(() => ({
        type: "Static", rotation: [-Math.PI / 2, 0, 0], material: 'ground',
    }));

    return <mesh ref={ref as any} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#375c20" />
    </mesh>;
}

export default Ground;