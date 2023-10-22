import { useBox } from '@react-three/cannon';
import type { FC } from 'react';

interface GrassProps {
    scale: [number, number, number];
    position: [number, number, number];
};

const Grass: FC<GrassProps> = ({ scale, position }) => {
    // let mesh = useGLTF('/models/dry_grass.glb').scene;

    const [ref] = useBox(() => ({
        args: scale,
        position,
        onCollide: (e) => {
            e.target.visible = false;
        },
        collisionResponse: false,
    }));


    return <mesh ref={ref as any}>
        <boxGeometry />
        <meshStandardMaterial color='#77cc41' />
    </mesh>;
}

export default Grass;