import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface VideoPlayerProps {
    videoSrc: string;
}

const VideoPlayer = ({ videoSrc }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current && videoRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newTime = (clickX / width) * videoRef.current.duration;
            videoRef.current.currentTime = newTime;
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="relative">
                <video
                    ref={videoRef}
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full rounded-lg"
                    controls={false}
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-lg"
                >
                    {isPlaying ? (
                        <Pause className="w-8 h-8" />
                    ) : (
                        <Play className="w-8 h-8" />
                    )}
                </button>
            </div>
            <div
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="w-full h-1 bg-gray-300 rounded mt-2 cursor-pointer"
            >
                <div
                    className="h-1 bg-blue-600 rounded"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default VideoPlayer;