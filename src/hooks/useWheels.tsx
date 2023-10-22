import { useCompoundBody, type CompoundBodyProps, type BodyProps } from "@react-three/cannon";
import { useRef } from "react"

interface WheelInfo {
    radius: number;
    directionLocal: [number, number, number];
    axleLocal: [number, number, number];
    suspensionStiffness: number;
    suspensionRestLength: number;
    frictionSlip: number;
    dampingRelaxation: number;
    dampingCompression: number;
    maxSuspensionForce: number;
    rollInfluence: number;
    maxSuspensionTravel: number;
    customSlidingRotationalSpeed: number;
    useCustomSlidingRotationalSpeed: boolean;
    chassisConnectionPointLocal: [number, number, number];
    isFrontWheel: boolean;
}

type GetByIndex<T extends BodyProps> = (index: number) => T;

export const useWheels = (width: number, height: number, front: number, wheelRadius: number) => {
    const wheels = [useRef(), useRef(), useRef(), useRef()];

    const wheelInfo: WheelInfo = {
        radius: wheelRadius,
        directionLocal: [0, -1, 0],
        axleLocal: [1, 0, 0],
        suspensionStiffness: 60,
        suspensionRestLength: 0.1,
        frictionSlip: 5,
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 100000,
        rollInfluence: 0.01,
        maxSuspensionTravel: 0.1,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true,
        chassisConnectionPointLocal: [1, 1, 1],
        isFrontWheel: false,
    };

    const wheelInfos: WheelInfo[] = [
        {
            ...wheelInfo,
            chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
            isFrontWheel: true,
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
            isFrontWheel: true,
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
            isFrontWheel: false,
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
            isFrontWheel: false,
        },
    ];

    const propsFunc: GetByIndex<CompoundBodyProps> = () => ({
        collisionFilterGroup: 0,
        mass: 1,
        shapes: [
            {
                args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
                rotation: [0, 0, -Math.PI / 2],
                type: "Cylinder",
            },
        ],
        type: "Kinematic",
    });

    useCompoundBody(propsFunc, wheels[0] as any);
    useCompoundBody(propsFunc, wheels[1] as any);
    useCompoundBody(propsFunc, wheels[2] as any);
    useCompoundBody(propsFunc, wheels[3] as any);


    return { wheels, wheelInfos };
}