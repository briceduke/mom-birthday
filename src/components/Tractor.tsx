import { useBox, useRaycastVehicle, type BoxProps } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { useEffect, type FC } from 'react';
import { useControls } from '../hooks/useControls';
import { useWheels } from '../hooks/useWheels';

const Tractor: FC = () => {
    let mesh = useGLTF('/models/tractor.glb').scene;

    const position: BoxProps['position'] = [-1.5, 0.5, 3];
    const width = 0.15;
    const height = 0.07;
    const front = 0.15;
    const wheelRadius = 0.05;

    const chassisBodyArgs: BoxProps['args'] = [width, height, front * 2];

    const [chassisBody, chassisApi] = useBox(() => ({
        args: chassisBodyArgs,
        position,
        mass: 150,
    }));

    const { wheelInfos, wheels } = useWheels(width, height, front, wheelRadius);

    const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
        chassisBody,
        wheels: wheels as any,
        wheelInfos,
    }));

    useControls(vehicleApi, chassisApi);

    useEffect(() => {
        mesh.scale.set(0.0012, 0.0012, 0.0012);
        mesh.children[0].position.set(0, 0, 0);
    }, [mesh]);

    return <group ref={vehicle as any} name="vehicle">
        <mesh ref={chassisBody as any} name='chassisBody'>
            <primitive object={mesh} rotation-y={Math.PI * 1.5} />
        </mesh>
    </group>;
}

export default Tractor;