import { Suspense, type FC } from 'react';
import { Environment, OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei';
import Tractor from './Tractor';
import { Physics } from '@react-three/cannon';
import Ground from './Ground';
import Field from './Field';

const Scene: FC = () => {
    return <Suspense fallback={null}>
        <Sky
            distance={450000}
            sunPosition={[5, 1, 8]}
            inclination={0}
            azimuth={0.25}
        />
        <directionalLight position={[3.3, 1.0, 4.4]} intensity={0} />
        <Physics
            broadphase='SAP'
        >
            <Environment preset='forest' />
            <PerspectiveCamera makeDefault position={[2, 0, 10]} fov={40} />
            <OrbitControls target={[-2.64, -0.71, 0.03]} maxPolarAngle={Math.PI / 2.4} />
            <Tractor />
            <Field />
            <Ground />
        </Physics>
    </Suspense>;
}

export default Scene;