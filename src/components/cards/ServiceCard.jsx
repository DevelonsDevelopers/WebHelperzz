import Image from "next/image";

const Card = ({ imageSrc, text }) => {
  return (
    <div className="cursor-pointer w-full h-[160px] bg-[#F7F9FB] rounded-[20px] flex items-center flex-col  hover:shadow-[2.0px_4.0px_4.0px_#119DED99]">
      <div className="w-16 h-[70px] mb-5 pt-[2rem] flex justify-center items-start">
        <Image src={`${imageSrc}`} alt="Icon" width={35} height={35} />
      </div>
      <p className="text-center text-[17px] font-[500] px-2">{text}</p>
    </div>
  );
};

export default Card;
