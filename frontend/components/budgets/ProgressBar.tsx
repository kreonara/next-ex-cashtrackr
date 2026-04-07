"use client"

import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ProgressBar = ({ percentage }: {percentage: number}) => {
  return (
    <div className="flex justify-center p-15">
      <CircularProgressbar
        value={percentage}
        styles={buildStyles({
          pathColor: percentage >= 100 ? '#DC2626' : '#F59E0B',
          trailColor: '#E1E1E1',
          textColor: percentage >= 100 ? '#DC2626' : '#F59E0B',
          textSize: 8,

        })}
        text={`${percentage}% Gastado`}
        
      />
    </div>
  )
}

export default ProgressBar