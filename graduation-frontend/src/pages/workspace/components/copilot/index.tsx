import { useMemo, type FC, type ReactNode } from "react";
import Star from "@/assets/img/star.svg";
import { useGenerateVideoFromText } from "@/service/queries/video";
import { useForm } from "react-hook-form";
import { useFormControl, Button } from "@mui/material";

interface IProps {
  children?: ReactNode;
}

interface FormValue {
  textarea: string;
}

const Copilot: FC<IProps> = () => {
  const generateVideoFromText = useGenerateVideoFromText();

  const { handleSubmit, register, formState } = useForm<FormValue>();

  const { errors } = formState;

  const handleTextAreaSubmit = (data) => {
    const { textarea } = data;
    console.log(textarea);
    generateVideoFromText.refetch();
  };

  const HelperTip = () => {
    const { focused } = useFormControl() || {};

    const helperText = useMemo(() => {
      if (focused) {
        return "focused";
      }

      return "请填写完整的信息!";
    }, [focused]);

    return <div className="text-[12px] text-red-800 my-1">{helperText}</div>;
  };

  return (
    <div className="flex-6 py-4 px-8 flex flex-col">
      <form
        className="flex flex-col justify-center items-center gap-2"
        noValidate
        onSubmit={handleSubmit(handleTextAreaSubmit)}
      >
        <textarea
          className="w-1/2 h-[300px] bg-[#2C2D2F] rounded-lg resize-none p-4 outline-none"
          placeholder="请给我一个主题和详细的介绍"
          rows={1}
          minLength={0}
          maxLength={3600}
          autoFocus
          {...register("textarea", {
            required: true,
            minLength: 0,
            maxLength: 2000,
          })}
        ></textarea>

        {!!errors.textarea && <HelperTip />}

        <div className="flex justify-end w-1/2">
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#1E64DA",
            }}
            disabled={generateVideoFromText.isPending}
          >
            <span className="text-white mr-1">生成视频</span>
            <img src={Star} alt="star" />
          </Button>
        </div>

        {generateVideoFromText.isPending ? <div>loading...</div> : <video />}

        <div className="fixed bottom-12 w-1/2 h-[50px] bg-[#202224] rounded-lg flex justify-around items-center">
          <span>工作流: </span>
          Tag
        </div>

        <div className="fixed bottom-1 text-sm text-[#7E7E7E] font-normal">
          Lico-AI 产生的结果{" "}
          <span className=" text-red-100 font-bold">并不完全可信</span>,
          可能会产生误差, 请审查并根据需要进行编辑更改!
        </div>
      </form>
    </div>
  );
};

export default Copilot;
