"use client";
import Image from "next/image";
import { updateGuest } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function UpdateProfile({ children, fullName, email, nationalID, countryFlag }) {
  return (
    <div>
      <form
        action={updateGuest}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            defaultValue={fullName}
            disabled
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            defaultValue={email}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <Image
              width={50}
              height={50}
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>

          {children}
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            defaultValue={nationalID}
            name="nationalID"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>
        <Button />
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-end items-center gap-6">
      <button
        disabled={pending}
        className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      >
        {pending ? "Updateing..." : "Update profile"}
      </button>
    </div>
  );
}

export default UpdateProfile;
