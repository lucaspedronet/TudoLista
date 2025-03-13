import React from "react";

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="progress-container">
            <div className="progress-bar">

            </div>
        </div>
    );
};

export default ProgressBar;