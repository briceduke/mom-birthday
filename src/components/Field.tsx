import type { FC } from 'react';
import Grass from './Grass';

const Field: FC = () => {
    const grid = [];
    for (let i = -9.5; i < 10.5; i++) {
        for (let j = -9.5; j < 10.5; j++) {
            grid.push(<Grass key={`${i}-${j}`} scale={[1, 1, 1]} position={[i, -0.3, j]} />);
        }
    }

    return <group>
        {grid}
    </group>;
}

export default Field;