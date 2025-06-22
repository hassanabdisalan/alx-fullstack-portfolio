import { concatErrors } from "@/helpers/errors";

interface ErrorOutputProps {
  error:
    | {
        name: string;
        message: string;
      }
    | Error;
}

export function ErrorOutput({ error }: ErrorOutputProps) {
  // console.log("error ", error);
  return (
    <div className="m-1 flex h-full w-[90%] items-center justify-center overflow-auto p-2">
      <div className="bg-error/5 m-1 flex h-full w-full items-center justify-center overflow-auto rounded-lg bg-red-700 p-2">
        <pre className="text-error p-[5%] text-center text-lg break-words whitespace-pre-wrap">
          {/* <code>{concatErrors(error.message)}</code> */}
          {JSON.stringify(concatErrors(error), null, 2)}
        </pre>
      </div>
    </div>
  );
}
