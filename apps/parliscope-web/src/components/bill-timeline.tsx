const BILL_STEPS = [
  { status: "SUBMITTED", label: "提出" },
  { status: "COMMITTEE", label: "委員会" },
  { status: "PLENARY", label: "本会議" },
  { status: "PASSED_LOWER", label: "衆院可決" },
  { status: "PASSED_UPPER", label: "参院可決" },
  { status: "ENACTED", label: "成立" },
];

interface BillTimelineProps {
  currentStatus: string;
}

export function BillTimeline({ currentStatus }: BillTimelineProps) {
  const currentIndex = BILL_STEPS.findIndex((s) => s.status === currentStatus);
  const isRejected = currentStatus === "REJECTED";
  const isWithdrawn = currentStatus === "WITHDRAWN";

  return (
    <div className="flex items-center gap-1">
      {BILL_STEPS.map((step, i) => {
        const isCompleted = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={step.status} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all ${
                  isCompleted ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                } ${isCurrent ? "ring-2 ring-purple-300 ring-offset-2" : ""}`}
              >
                {isCompleted ? "\u2713" : i + 1}
              </div>
              <span
                className={`mt-1 text-[10px] ${isCompleted ? "font-medium text-purple-700" : "text-gray-400"}`}
              >
                {step.label}
              </span>
            </div>
            {i < BILL_STEPS.length - 1 && (
              <div
                className={`mx-1 h-0.5 w-4 ${i < currentIndex ? "bg-purple-600" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
      {(isRejected || isWithdrawn) && (
        <div className="ml-2 flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-600">
            \u2715
          </div>
          <span className="mt-1 text-[10px] font-medium text-red-600">
            {isRejected ? "否決" : "撤回"}
          </span>
        </div>
      )}
    </div>
  );
}
