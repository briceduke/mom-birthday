import type { FC } from 'react';
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp } from 'react-icons/fa6';

const Buttons: FC = () => {
    return <div className="flex gap-4 items-center">

        {/* trigger leftButtonPress event on button press and release */}
        <button
            className="w-10 h-10 bg-black flex items-center justify-center"
            onTouchStart={() => {
                window.dispatchEvent(new CustomEvent('leftButtonPress'));
            }}
            onTouchEnd={() => {
                window.dispatchEvent(new CustomEvent('leftButtonRelease'));
            }}
        >
            <FaArrowLeft />
        </button>

        <div className="flex flex-col gap-4">
            {/* trigger upButtonPress event on button press and release */}
            <button
                className="w-10 h-10 bg-black flex items-center justify-center"
                onTouchStart={() => {
                    window.dispatchEvent(new CustomEvent('upButtonPress'));
                }}
                onTouchEnd={() => {
                    window.dispatchEvent(new CustomEvent('upButtonRelease'));
                }}
            >
                <FaArrowUp />
            </button>

            {/* trigger downButtonPress event on button press and release */}
            <button
                className="w-10 h-10 bg-black flex items-center justify-center"
                onTouchStart={() => {
                    window.dispatchEvent(new CustomEvent('downButtonPress'));
                }}
                onTouchEnd={() => {
                    window.dispatchEvent(new CustomEvent('downButtonRelease'));
                }}
            >
                <FaArrowDown />
            </button>
        </div>

        {/* trigger rightButtonPress event on button press and release */}
        <button
            className="w-10 h-10 bg-black flex items-center justify-center"
            onTouchStart={() => {
                window.dispatchEvent(new CustomEvent('rightButtonPress'));
            }}
            onTouchEnd={() => {
                window.dispatchEvent(new CustomEvent('rightButtonRelease'));
            }}
        >
            <FaArrowRight />
        </button>
    </div>;
}

export default Buttons;