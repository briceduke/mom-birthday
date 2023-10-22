import { Canvas } from '@react-three/fiber';
import { Suspense, type FC } from 'react';
import Scene from './Scene';

const Game: FC = () => {

    return <Suspense fallback={null}>
        <Canvas>
            <Scene />
        </Canvas>
    </Suspense>;
}

export default Game;