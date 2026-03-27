// import logo from './logo.jpg|png';

import Image from "next/image"

const Logo = () => {
  return (
    // <img
    //   src="/logo.svg"
    //   alt="Logo CashTrackr" 
    //   width={400}
    //   height={100}
    // />
    <Image 
      src="/logo.svg"
      alt="Logo CashTrackr" 
      width={0}
      height={0}
      className="w-full"
      priority
    />
  )
}

export default Logo