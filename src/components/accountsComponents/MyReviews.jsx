import react , {useEffect , useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { IoStarSharp } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import customerService from '@/api/services/customerService'
import moment from 'moment';


const MyReviews = () => {

  const [data , setData] = useState([])

  const [noData , setNoData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customerService.getReviews();
        setData(response.reviews);
        setNoData(response.reviews.length === 0);
        console.log('response', response);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    fetchData();
  }, []);

  

  return (
    <div className="max-w-[1100px] m-auto py-12">
{noData ?
  <h1 className="text-center text-2xl font-[600]  py-12 "> No Reviews Yet </h1>
  :

<>


      <h1 className="ml-4 text-2xl ">My Reviews </h1>

      {/* <div className="flex max-md:flex-col ml-4  md:pl-0 gap-2 items-center mt-10 ">
        <div className="flex items-center gap-4  max-md:mr-auto">
          <p className="sm:text-2xl  font-semibold text-lg">Sort by:</p>
          <p className="sm:text-2xl font-semibold text-md">Newest</p>
          <LuArrowUpDown
            className={`md:h-6 md:w-6  h-4 w-4 cursor-pointer  `}
          />
        </div>
        <div className="flex items-center gap-2 max-md:mr-auto">
          <p className="sm:text-2xl font-semibold text-md">By Star</p>
          <LuArrowUpDown
            className={`md:h-6 md:w-6  h-4 w-4 cursor-pointer  `}
          />
        </div>

      </div> */}

       <div className="grid grid-cols-2 gap-4 py-10">

      {data.map((value, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 bg-white rounded-2xl p-4">
            <div className="flex gap-2">

              <div className="flex flex-col justify-between">
                <p className="font-bold line-clamp-1 text-ellipsis">
                   <span className="font-normal text-[#313232]">
                   {moment(value.created_date).format("MMM Do YY")}
                  </span>
                </p>
                <div className="flex items-center gap-2 ">
                  <IoStarSharp className="text-[#12937C]" size={25} />
                  <p className="">{value.rating} / 5</p>
                </div>
                <p className="font-semibold text-[#313232] text-xs">
                  {value.title}
                </p>
              </div>
            </div>
            <p className="text-[#262626] font-semibold text-sm line-clamp-2 text-ellipsis">
             {value.review}
            </p>
            {/* <Link href="" className="text-sm font-semibold text-[#12937C]">
              Read More
            </Link> */}
          </div>
        </div>
      ))}
      </div>
      </>
      
      }
    </div>
  );
};
export default MyReviews;
