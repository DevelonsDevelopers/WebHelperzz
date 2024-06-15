import Image from "next/image";
import { useRouter } from "next/navigation";

const Card = ({ imageSrc, text, tag }) => {
  const navigate = useRouter();

  return (
    <div
    // onClick={() => navigate.push(`/getquotes/create/${tag}/any`)}s
    onClick={() => navigate.push(`/getquotes/create/${text.replaceAll(' ', '-').replaceAll('/', '-').toLowerCase()}/any`)}
      className="cursor-pointer w-full h-[160px] bg-[#F7F9FB] rounded-[20px] flex items-center flex-col  hover:shadow-[2.0px_4.0px_4.0px_#119DED99]"
    >
      <div className="w-16 h-[70px] mb-5 pt-[2rem] flex justify-center items-start">
        <img src={`${imageSrc}`} alt="Icon" width={35} height={35} />
      </div>
      <p className="text-center text-[17px] font-[500] px-2">{text}</p>
    </div>
  );
};

export default Card;
