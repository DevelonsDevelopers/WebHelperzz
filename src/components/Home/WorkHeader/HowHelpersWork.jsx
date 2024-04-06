import React from "react";

export const HowHelpersWork = () => {
  return (
    <section className="min-h-70 bg-[#ffff] lg:bg-[#B7E2FA]  py-10">
      <div>
        <h2 className=" sm:text-3xl text-3xl font-bold text-center ">
          How Helperzz Works
        </h2>
      </div>

      <div className="container mx-auto flex flex-col justify-center w-[75%]">
        <div className="flex sm:gap-0 gap-5 pl-20 sm:p-0 justify-start sm:justify-between mt-6 flex-wrap ">
          <div className="flex items-center ">
            <h2 className="text-5xl sm:text-[70px] font-medium">1</h2>
            <div className="flex gap-1 flex-col ml-3">
              <h5 className="fs-6 font-semibold">Create a job for free</h5>
              <p>tell us what you need</p>
            </div>
          </div>
          <div className="flex items-center ">
            <h2 className="text-5xl sm:text-[70px] font-medium">2</h2>
            <div className="flex gap-1 flex-col ml-3">
              <h5 className="fs-6 font-semibold">Get a quotee</h5>
              <p>Tradespeople get in touch</p>
            </div>
          </div>
          <div className="flex items-center ">
            <h2 className="text-5xl sm:text-[70px] font-medium">3</h2>
            <div className="flex gap-1 flex-col ml-3">
              <h5 className="fs-6 font-semibold">Rate and review</h5>
              <p>Job done - leave feedback</p>
            </div>
          </div>
        </div>
        <a class="text-text mt-6 cursor-pointer hover:bg-primary hover:text-white hover:border-0 transition-none  min-w-60 justify-center border px-5 py-2 rounded-2xl font-semibold bg-[#fff] inline-flex items-center mx-auto">
          Create A Job For Free
        </a>
      </div>
    </section>
  );
};
