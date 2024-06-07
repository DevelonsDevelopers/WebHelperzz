import react, {useState, useEffect} from 'react'
import {PatternFormat} from 'react-number-format';
import customerService from '@/api/services/customerService'

const MyProfile = () => {

    // const [id, setId] = useState(params?.id);
    // console.log('params in profile request', id)
    //
    // useEffect(() => {
    //     if (params) {
    //         setId(params?.id)
    //     }
    // }, [params])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await customerService.getProfile();
                console.log('response', response);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="max-w-[1100px] px-10  bg-gray-100 py-12 shadow-lg m-auto rounded-xl p-6">
                <div className='flex gap-4 max-md:flex-col justify-between'>
                    <div className="mb-4 w-full">
                        <label className="text-left text-gray-700 font-bold mb-2">
                            Display Name
                        </label>
                        <input
                            // name={names[0]}
                            // onChange={(e) => handleChange(e)}
                            type="text"
                            className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none `}
                            style={{
                                boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                            }}
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label className="text-left text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            // name={names[0]}
                            // onChange={(e) => handleChange(e)}
                            type="text"
                            className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none `}
                            style={{
                                boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                            }}
                        />
                    </div>

                </div>
                <div className='flex gap-4 max-md:flex-col justify-between'>
                    <div className="mb-4 w-full">
                        <label className="text-left text-gray-700 font-bold mb-2">
                            Address
                        </label>
                        <input
                            // name={names[0]}
                            // onChange={(e) => handleChange(e)}
                            type="text"
                            className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none `}
                            style={{
                                boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                            }}
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label className="text-left text-gray-700 font-bold mb-2">
                            Phone
                        </label>
                        <PatternFormat
                            type="tel"
                            format="+1 (###) ###-####"
                            // onValueChange={(value) =>
                            //     setRegisterData((data) => ({
                            //         ...data,
                            //         phone: value.value,
                            //     }))
                            // }
                            required
                            className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none  `}
                            style={{
                                boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                            }}
                        />
                    </div>

                </div>
                <button
                    // onClick={(e) => handleRegister(e)}
                    className="mb-3 py-3 inline-block w-full rounded px-6 font-bold text-base uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    type="button"
                    style={{
                        background: "#27a9e1",
                    }}
                >
                    Update
                </button>

            </div>

        </div>
    );
};
export default MyProfile;
