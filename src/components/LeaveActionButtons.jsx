"use client";

import { useRouter } from "next/navigation";

export default function LeaveActionButtons({
  requestId,
}) {

  const router = useRouter();

  const approve = async () => {

    console.log("Approve Clicked");
  
    const response = await fetch(
      `/api/leave-requests/${requestId}/approve`,
      {
        method: "POST",
      }
    );
  
    console.log(await response.json());
  
    router.refresh();
  };

  const reject =
    async () => {

      await fetch(
        `/api/leave-requests/${requestId}/reject`,
        {
          method: "POST",
        }
      );

      router.refresh();
    };


   

  return (
    <div className="flex gap-2">

      <button
        onClick={approve}
        className="
          px-4
          py-2
          bg-green-600
          text-white
          rounded-lg
        "
      >
        Approve
      </button>

      <button
        onClick={reject}
        className="
          px-4
          py-2
          bg-red-600
          text-white
          rounded-lg
        "
      >
        Reject
      </button>

    </div>
  );
}