import React, { useState, useEffect } from "react";
import { useStateContext } from "./context/ThemeContext";
import { useForm } from "react-hook-form";

const MAX_STEPS = 3;
function App() {
  const { darkMode, toggleDarkMode } = useStateContext();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const handleClick = () => {
    toggleDarkMode();
  };
  const [formStep, setFormStep] = useState(0);
  const completeFormStep = () => {
    // setFormStep(formStep + 1);
    setFormStep((cur) => cur + 1);
  };

  const renderButton = () => {
    if (formStep > 2) {
      return undefined;
    } else if (formStep === 2) {
      return (
        <button
          type="submit"
          disabled={!isValid}
          className="mt-6 bg-green-600 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      );
    } else {
      return (
        <button
          type="button"
          disabled={!isValid}
          onClick={completeFormStep}
          className="mt-6 bg-green-600 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      );
    }
  };

  const submitForm = (values) => {
    window.alert(JSON.stringify(values, null, 2));
    completeFormStep();
  };

  const goToPreviousStep = () => {
    setFormStep((cur) => cur - 1);
  };

  return (
    <div>
      <div
        className={` min-h-screen W-[100%] flex flex-col items-start text-gray-900 antialiased relative ${
          darkMode ? "bg-slate-900" : "bg-green-900"
        } `}
      >
        <div className="z-10 flex justify-end w-full pr-5">
          <button
            onClick={handleClick}
            className={` px-3 py-1 rounded-md mt-3 ${
              darkMode
                ? "bg-gray-300 text-black"
                : "bg-slate-900 text-slate-200"
            }`}
          >
            {darkMode ? "💡 light" : "🌙 dark"}
          </button>
        </div>
        <div
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)",
            height: "34rem",
          }}
          className={`absolute  inset-x-0 top-0 ${
            darkMode ? "bg-slate-800" : "bg-green-800"
          }`}
        ></div>
        {/*  */}
        <div className="mx-auto z-10 mt-30 2xl:mt-48 text-center ">
          <h1 className="text-white text-5xl font-semibold">
            React <span className="text-yellow-500">Hook Form</span>
          </h1>
          <p className="text-green-200 mt-2">get your ticket in 4 steps</p>
        </div>
        {/*  */}
        {/*  */}
        <div className="max-w-xl w-full mt-24 mb-24 rounded-lg shadow-2xl bg-white mx-auto overflow-hidden z-10">
          <div className="px-16 py-10">
            <form onSubmit={handleSubmit(submitForm)}>
              {formStep < MAX_STEPS && (
                <div className="flex items-center mb-2">
                  {formStep > 0 && (
                    <button onClick={goToPreviousStep} type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-6 text-gray-400 hover:text-gray-600 mr-2"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                  <p className="text-sm text-gray-700  ">
                    Step {formStep + 1} of {MAX_STEPS}
                  </p>
                </div>
              )}
              {formStep === 0 && (
                <section>
                  <h2 className="font-semibold text-3xl mb-8">
                    Personal Information
                  </h2>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="mt-2 p-2 block w-full rounded border-2 border-gray-300 focus:border-yellow-400 focus:ring-0"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Username is required",
                      },
                    })}
                  />
                  {errors.username && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.username.message}
                    </p>
                  )}
                </section>
              )}

              {formStep === 1 && (
                <section>
                  <h2 className="font-semibold text-3xl mb-8">
                    Billing Information
                  </h2>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="mt-2 p-2 block w-full rounded border-2 border-gray-300 focus:border-yellow-400 focus:ring-0"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "Address is required",
                      },
                    })}
                  />
                  {errors.address && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.address.message}
                    </p>
                  )}
                </section>
              )}

              {formStep === 2 && (
                <section>
                  <h2 className="font-semibold text-3xl mb-8">
                    Legal Information
                  </h2>
                  <div className="block mt-6">
                    <input
                      name="toc"
                      className="p-3 text-green-600 rounded mr-3 border-2 border-gray-300 ring-0 focus:ring-0 focus:ring-offset-0 focus:border-0 cursor-pointer"
                      type="checkbox"
                      {...register("check1", {
                        required: true,
                      })}
                    />
                    <span>
                      I accept the{" "}
                      <a className="text-blue-400 underline" href="/">
                        Terms and Conditions
                      </a>
                      .
                    </span>
                  </div>
                  <div className="block mt-6">
                    <input
                      name="pp"
                      className="p-3 text-green-600 rounded mr-3 border-2 border-gray-300 ring-0 focus:ring-0 focus:ring-offset-0 focus:border-0 cursor-pointer"
                      type="checkbox"
                      {...register("check2", {
                        required: true,
                      })}
                    />
                    <span>
                      I accept the{" "}
                      <a className="text-blue-400 underline" href="/">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </div>
                </section>
              )}

              {formStep === 3 && (
                <section>
                  <h2 className="font-semibold text-3xl mb-8 ">
                    Congratulation
                  </h2>
                </section>
              )}
              {renderButton()}
              <pre>{JSON.stringify(watch(), null, 2)}</pre>
            </form>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default App;
