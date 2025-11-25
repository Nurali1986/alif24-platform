import { useEffect, useState } from 'react';

const CatAnimation = () => {
    const [isWaving, setIsWaving] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsWaving(prev => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="cat-animation">
            <svg width="100" height="100">
                <circle cx="50" cy="30" r="10" fill="black" className={`eye ${isWaving ? 'blink' : ''}`} />
                <circle cx="35" cy="30" r="5" fill="white" className={`eye ${isWaving ? 'blink' : ''}`} />
                <circle cx="65" cy="30" r="5" fill="white" className={`eye ${isWaving ? 'blink' : ''}`} />
                <path
                    d="M50,50 C60,70 40,70 50,50"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                    className={`body ${isWaving ? 'sway' : ''}`}
                />
                <rect
                    x="70"
                    y="50"
                    width="10"
                    height="30"
                    fill="black"
                    className={`hand ${isWaving ? 'wave' : ''}`}
                />
            </svg>
            <style>
                {`
                    .eye.blink {
                        animation: blink 0.5s infinite;
                    }
                    @keyframes blink {
                        0%, 20%, 100% { transform: scaleY(1); }
                        10% { transform: scaleY(0.1); }
                    }
                    .hand.wave {
                        animation: wave 0.5s infinite;
                    }
                    @keyframes wave {
                        0%, 100% { transform: rotate(0); }
                        50% { transform: rotate(30deg); }
                    }
                    .body.sway {
                        animation: sway 1s infinite ease-in-out;
                    }
                    @keyframes sway {
                        0%, 100% { transform: translateX(0); }
                        50% { transform: translateX(-5px); }
                    }
                `}
            </style>
        </div>
    );
};

export default CatAnimation;
