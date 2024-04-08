"use client";
import React from "react";
import "../../../style/GetQuotes.css";
import Link from "next/link";

export default function SentRequest() {
  return (
    <div>
      <header>
        <Link href="/">
          <div className="logo p-4 text-2xl font-bold text-gray-600  h-[10vh] shadow-lg background-color-gray color-gray shadow-gray-200">
            Helperzz
          </div>
        </Link>
      </header>
      <div className=" items-center text-center justify-center  flex flex-col w-full mx-auto ">
        <div className="h-[70vh] bg-gray-50 w-full">
          <div className="flex-col flex justify-center mt-10 max-auto items-center">
            <img
              className=""
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFWklEQVR4nO2bW0wcVRjH/zPusizh1oEul9SimC4lhpRggARpUgtpQ1RKoqEo2hdDS/XNF1oTKUoUHnjRpqlNTBWTBoSgGB6IQapSIkp4qAnhYtgaaculklQNtxaWz3yTGTJZdoZLl3Z7ln9yspvZZOb8f2e+b75z9gwQHHoCQA+AewBuAPgcQDZCSK8AIJ/mBfCJBkd4/cKmz58/T8PDw3T27FlyOBw6iEYIrufZaHx8PM3NzZGu/v5+io6O1iG8CoH1LZusrq4mX12+fFkHcB2Cys2x7nQ6aXp6eg2ApaUliouL0yE8BQF1ic1VVlaSmQoKCnQAL0AwuWRZXpRlmUZHR00BHDp0aEkDUADB9AEbKykpISspinJPA/A0BFKE3W7/h4319vaamudHomZ+GoAEgfQOG8vJybEc/YsXL+oAmiCQ5IiIiFtsrK2tzRJAWVmZDqASopW9qamptLy8bAkgKSlpRQOwH6IoNjZ2kE1duHDB0rwh/idFiv98NqUoCs3OzoZe/CcnJ/eyqXPnzlmaFzX+3ZIkrfAsb3Jycl0AycnJJFT879u3r4MNnTp1al3zevzLsizM89/lcDi8kiTR0NDQugCEi/+srKzGjZS9jzr+XwSgFigBaLMAurVzRsTExNzn4z09Paam8/LyAnHdjfTrRwAv+wNwc5su2sefubm5lqOen5//MAAY20e+ANQfTlydWm0l309Q2td/bbo981k/7X79DEk2++oFW1tb6VHr9u3bVF9fT3a7Xa8wX7IE8ObVqS0B0BtD4HPu2bNn3bL3YYohaH6vmgLY/Wz26ug592dv7U64NED6gmcwiesQzdt/pgBcGbkGADlbvgv0cwSTePWZ+yRJ0j3LEDjxgCEQrAC6urr0Qms45ADMzMxQRkaGV+tXdUgA4OzPo15TU0OJiYlqTQJgFEDktibBYABw+PBhfzUA3/pPWtYBoiTBwsJCfwAWAJSuWwiJEgIsr9er/v9QXl5+xwAhPWQAGFVRUTGv9evLkATg8XjUPkVGRv4rfBL0p4WFBS6CeA/CfeGToD9du3ZNrwR/D7kQuHv3LmVmZt4PqUJoamqKuru7qba2llJSUvSp8B+8WCM8gOLiYn91wG+8Sg+rOkCUJMjrkEbzTqfzJ7OVZhI1CeorQWFhYeRvJUjoEDBZCeIF2zUSHoDZSlDIAOD5gNYffhKskZBJ0KiRkRG9P7dCKgnqo19UVKTPBL8ImRDweDzU3NxMBw8eXDLEv1t4AIuLi+R2u30LoL8BFPozv2kA7itjpBRXkm2Xi2y7Ekg5dlo9FkwA0tLSfAH8CiAMJqLNJEE2zL85UtLJsTdd/c7HggWA8T+AlpYWdVuOvwnQlpMgjzobT2v+U238nY8FGwBdjY2Nel88AQkB2xoA+4MawPj4uN6X5Q3NBU6sA2A1BPYaQqDk7aAF0NHRMWNVA2wtCR47rY56MCZBo8bGxlaioqLGtb58ChPR41AJzs/P08TEhLrXqK+vjzo7O6mpqUndV1RXV0dVVVV08uRJKi0tpSNHjtCBAwdWJEnyGhZB4jcEwBWASpA3SujnaGhooPb2dhoYGFDb4ODgGgM8W2MDvJPs+PHjdPToUXVnCT/OEhISjC9SbbZxEXQFQJKZeb8h8MaDbpB4rWqrHTZtNpttPjw8/E5UVNSNmJiY63FxcT2KorS7XK7G2NjYBkVR3pdluUJ70YqLnkzfpa8NAygJzBYZnnm9B+BjAN8A+AHAgNZ+BvAdgK+02PwQwLsA3tI2VfNbIs8BSAWgbPc7hDcDPVqa+TN4TFQUQAj8yOm0qrt3tKMd7QhBoP8BQJ+7/+dzTTQAAAAASUVORK5CYII="
            />
            <div className="text-3xl font-bold mt-8 mb-3">
              Your Service Request Was Sent!
            </div>
            <div className="text-md font-medium my-3 text-gray-500 md:w-[600px] w-full">
              We're matching you with qualified pros. You'll receive an
              <span className="font-bold text-gray-600"> email</span> when they
              respond. Complete your account setup to chat with pros in your
              HomeStars{" "}
              <span className="font-bold text-gray-600">dashboard</span>
            </div>
            <div className="mt-3 md:mt-5 flex justify-center text-center">
              <a class=" hover:bg-[#2f92c3]  bg-[#27a9e1] transition-all cursor-pointer text-white   text-sm md:text-lg justify-center rounded-md px-5  py-3  font-bold text-transform: uppercase">
                complete profile
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold mt-12">What Happens Next?</div>
          <div className="flex md:flex-row mt-10 xl:gap-36 lg:gap-28 flex-col mb-20">
            <div className="flex flex-row md:flex-col justify-center max-auto items-center mt-4 md:mt-0">
              <div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgElEQVR4nO2U0QqAIAxF708o9f9/lA99zg2hoHyxdM0WOzAQRHfchoDjOFeoFN8XeAsXYGsLKNRruwJS2BXg6BZwtIAUdgXY+8ebF5DCBXi3BazECmA+nQsAFolZYYPE0+TdMxYBpP2iVKzzngqheHWuxqSVvJQYkvwgapYdv2QD7Lz4EYXceEwAAAAASUVORK5CYII=" />
              </div>
              <div className="text-lg md:font-normal font-bold mt-2 ml-3">
                1. Connect with pros
              </div>
            </div>
            <div className="flex flex-row md:flex-col justify-center max-auto items-center  mt-4 md:mt-0">
              <div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAACTklEQVR4nO2XzU4UQRDHf8YDaFh38Q1WRF9A8SvRRPAJMCa8BqIHo0ej3BTRuxrCU8BqeANUDhoPwAFRWC8e1o+spk11Uil7ZnqmZ+OFf9KZ7NZH/7u6uroaDjBYjPKfMA7cAlaBbeA78Fu+W8CKyE8OksQ54LVMHDteARN1kjgGLAP9jAn3gY/yDcmd3RLQSCVyAnhrnO8Bj4FJYNjou99TwILoabs3QDuFyGflrAfcB5qR9i3ggdh5H7tVCDWAdeXkC3CZargA7ChfGyUW9BfLyvhTSnhVlHeVT5dDUTivkrUnK6sDl9SW9WNPmT6+LkfqxEPlu1OkfMrkSTNh4sPAMxPZlikBuYXxtlJ8lEjkufj5ZpL/iZrjZp6TjlK8mkDkhakxc0o+FbtVmyrBhmsicsfoHDUFNIhDwA9V4lO2xo97GbpdpTMUUmgqhfc5hKtGROOD0jueNZFvB7oB+Q25hRsJEfH4WhSZvJyZAX6JbA0YqRiR6Jyxp2lS/X8d+Klka7KtZYk4XFP6rkHLxJxSXDAyS2i/AhGHRWUzW9RS6hC2CgiVJTJqFjFWZOCS1Cu7foQCQrFEHOZjt8jjrLq1Xd25EtCZFtndhFv7TKzhkunOXD9icTqhn3lZwpaRQKcXilAMLkqD5n29kya/FNpmNT3pR2xS5yXrvCqklXtgj7Z09fZpsii37xH+LWiujjwNHP31GtpXGpJDWe+mrryb9OWnR19yxFftWjBhKnTMWJXTOTCMSYfWCTzU9oTAbExBGwSGJFkzb98DkIg/jKEpiVFEZKkAAAAASUVORK5CYII=" />
              </div>
              <div className="text-lg md:font-normal font-bold mt-2 ml-3">
                2. Hire your pro
              </div>
            </div>
            <div className="flex flex-row md:flex-col justify-center max-auto items-center  mt-4  md:mt-0">
              <div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAACaklEQVR4nN2Xu2tUQRTGf/EJJhI0/g2JhdjoqviKz6hFSqtAMI1/hKXaJY1gIQgSEDFKWqNEwee6nYKFjU1EC4uQh0YR1Kwc+UYOl3uz95W96AfD3Z2Z7zvfztwzZxb+M2wDRvSsHC+App6V4rSMhHaqSjPPI2ZeVmXkeMRIaMeqMPPEGbjkPj9ut5H9LnhdfU9d3+F2mnnoAtt2GU64vul2GdkXsyoBz9zYwXaYue8C2mp4nHRjU2UH7tFKDAOXgckVViWg7uZMijcsnZ60Qc8CF4BxoAHMJqRuaAMJWgMteLPSH1c8i7s1kDcCH1sINF37BIy2+HFjmpdW0+JvMOImYDEyuAS8AiaAi8AQUAO6yYZu8YakMyHdpUi8Bfn4A6sp39zgNWANq4MO4IqL9R0YjE7qB764SddXwZAZuepifFUGxuIQ8NlNvgWsK8mI/bAbESPhwEyEHVbe0O0SDK1V9vh38miW2rPoyHeB9QWM3HRa9iocySqyF5h3Ine051nQIV7QmJduLuwG5pxYX0b+dsedk14hTDnBvydlSmxx3HuUgPcS+5CTH073maJGuoBliVm1zoMH4pvO5iJm9rhltnoTB8uynStk25jTML3cGHFC52IOMau47zRu23leqZxWIxNGnZDPBLtUvU6owG9lMhwDNTfWqtqnyqRfQKdOzUYk+A/gkZ6+v6H5neIXvv3NuBI/HQm2rAOtV3N79T288P5yvlA0o7pihEOzfwe7Eng7VD7ieLkzqhYjVtdVIw36I/fh0Ew3M/qAnxJ4E3cBSolB8ZvSC9uaGQeAMyVcsoxvOnYb+DfwGzYNFWdO0Od6AAAAAElFTkSuQmCC" />
              </div>
              <div className="text-lg md:font-normal font-bold mt-2 ml-3">
                3. Write a review
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
