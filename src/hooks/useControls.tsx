import type { PublicApi, RaycastVehiclePublicApi } from "@react-three/cannon";
import { useEffect, useState } from "react";

export const useControls = (vehicleApi: RaycastVehiclePublicApi, chassisApi: PublicApi) => {
    const [controls, setControls] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
    });

    useEffect(() => {
        const keydown = (e: KeyboardEvent) => {
            setControls((controls) => ({
                forward: (e.code === 'KeyW' || e.code === 'ArrowUp') ? true : false,
                backward: (e.code === 'KeyS' || e.code === 'ArrowDown') ? true : false,
                left: (e.code === 'KeyA' || e.code === 'ArrowLeft') ? true : false,
                right: (e.code === 'KeyD' || e.code === 'ArrowRight') ? true : false,
            }));
        };

        const keyup = (e: KeyboardEvent) => {
            setControls((controls) => ({
                forward: (e.code === 'KeyW' || e.code === 'ArrowUp') ? false : controls.forward,
                backward: (e.code === 'KeyS' || e.code === 'ArrowDown') ? false : controls.backward,
                left: (e.code === 'KeyA' || e.code === 'ArrowLeft') ? false : controls.left,
                right: (e.code === 'KeyD' || e.code === 'ArrowRight') ? false : controls.right,
            }));
        };

        const upButtonPress = () => {
            setControls((controls) => ({
                ...controls,
                forward: true,
            }));
        }

        const upButtonRelease = () => {
            setControls((controls) => ({
                ...controls,
                forward: false,
            }));
        }

        const downButtonPress = () => {
            setControls((controls) => ({
                ...controls,
                backward: true,
            }));
        }

        const downButtonRelease = () => {
            setControls((controls) => ({
                ...controls,
                backward: false,
            }));
        }

        const leftButtonPress = () => {
            setControls((controls) => ({
                ...controls,
                left: true,
            }));
        }

        const leftButtonRelease = () => {
            setControls((controls) => ({
                ...controls,
                left: false,
            }));
        }

        const rightButtonPress = () => {
            setControls((controls) => ({
                ...controls,
                right: true,
            }));
        }

        const rightButtonRelease = () => {
            setControls((controls) => ({
                ...controls,
                right: false,
            }));
        }

        window.addEventListener('keydown', keydown);
        window.addEventListener('keyup', keyup);
        window.addEventListener('upButtonPress', upButtonPress);
        window.addEventListener('upButtonRelease', upButtonRelease);
        window.addEventListener('downButtonPress', downButtonPress);
        window.addEventListener('downButtonRelease', downButtonRelease);
        window.addEventListener('leftButtonPress', leftButtonPress);
        window.addEventListener('leftButtonRelease', leftButtonRelease);
        window.addEventListener('rightButtonPress', rightButtonPress);
        window.addEventListener('rightButtonRelease', rightButtonRelease);

        return () => {
            window.removeEventListener('keydown', keydown);
            window.removeEventListener('keyup', keyup);
        }
    }, []);

    useEffect(() => {
        if (controls.forward) {
            vehicleApi.applyEngineForce(100, 2);
            vehicleApi.applyEngineForce(100, 3);
        } else if (controls.backward) {
            vehicleApi.applyEngineForce(-100, 2);
            vehicleApi.applyEngineForce(-100, 3);
        } else {
            vehicleApi.applyEngineForce(0, 2);
            vehicleApi.applyEngineForce(0, 3);
        }

        if (controls.left) {
            vehicleApi.setSteeringValue(0.35, 2);
            vehicleApi.setSteeringValue(0.35, 3);
            vehicleApi.setSteeringValue(-0.1, 0);
            vehicleApi.setSteeringValue(-0.1, 1);
        } else if (controls.right) {
            vehicleApi.setSteeringValue(-0.35, 2);
            vehicleApi.setSteeringValue(-0.35, 3);
            vehicleApi.setSteeringValue(0.1, 0);
            vehicleApi.setSteeringValue(0.1, 1);
        } else {
            for (let i = 0; i < 4; i++) {
                vehicleApi.setSteeringValue(0, i);
            }
        }

    }, [controls, vehicleApi, chassisApi]);

    return controls;
}