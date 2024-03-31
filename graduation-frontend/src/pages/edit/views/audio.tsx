import type { FC, ReactNode } from "react";
import FileUploadSvg from "@/assets/img/fileUploader.svg";
import TextToSpeechSvg from "@/assets/img/textToSpeech.svg";
import CloneVoiceSvg from "@/assets/img/cloneVoice.svg";
import BrandKitSvg from "@/assets/img/brandKit.svg";
import PlusSvg from "@/assets/img/plus.svg";
import ViocerSvg from "@/assets/img/viocer.svg";
interface IProps {
  children?: ReactNode;
}

const EditAudio: FC<IProps> = () => {
  return (
    <div className="p-6 flex flex-col gap-8 font-semibold text-[#1A2033]">
      <span className="text-[18px]">添加视频</span>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="border border-[#DFE0E5] border-dashed w-full h-40 rounded-md hover:border-[#2C98FA] hover:bg-[#F0F9FF]">
          <input
            type="file"
            accept="audio/mp4,.mp4,audio/mpeg,.mpg,audio/*,.aac,.wav,.m4a,.mp3"
            style={{ display: "none" }}
            multiple
            id="file"
          />
          <label htmlFor="file">
            <div className="w-full h-full flex flex-col justify-center items-center gap-2">
              <img src={FileUploadSvg} alt="fileUploaderSvg" />
              <span className="text-[#192033] text-sm">上传一个文件</span>
              <span className="text-[#9194A5] text-xs">
                点击浏览，或 将文件拖放到此处
              </span>
            </div>
          </label>
        </div>
        <div className="w-full grid grid-cols-2 grid-rows-2 gap-4">
          <div className="h-32 border border-[#EEEEF0] hover:border-[#72C1FD] rounded-lg flex flex-col justify-center items-center gap-2 row-span-2">
            <img src={TextToSpeechSvg} alt="textToSpeech" />
            <span className="text-sm font-normal">文字转语音</span>
          </div>

          <div className="h-32 border border-[#EEEEF0] hover:border-[#72C1FD] rounded-lg flex flex-col justify-center items-center gap-2 row-span-2">
            <img src={CloneVoiceSvg} alt="cloneVoice" />
            <span className="text-sm font-normal">克隆声音</span>
          </div>

          <div className="h-32 border border-[#EEEEF0] hover:border-[#72C1FD] rounded-lg flex flex-col justify-center items-center gap-2 row-span-2">
            <img src={ViocerSvg} alt="viocer" />
            <span className="text-sm font-normal">话外音</span>
          </div>

          <div className="h-32 border border-[#EEEEF0] hover:border-[#72C1FD] rounded-lg flex flex-col justify-center items-center gap-2 row-span-2 relative">
            <img src={BrandKitSvg} alt="brandKit" />
            <div className="bg-[#F9A432] w-5 h-5 rounded-md flex justify-center items-center mr-7 absolute -top-2 -right-9">
              <img src={PlusSvg} alt="plusSvg" />
            </div>
            <span className="text-sm font-normal">企业品牌</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row justify-between items-center">
          <h4 className="font-normal">音乐素材</h4>
          <span className="text-xs text-[#9194A5] font-normal hover:text-[#72C1FD]">
            查看更多
          </span>
        </div>

        <div className="flex flex-row justify-between items-center">
          <h4 className="font-normal">音效素材</h4>
          <span className="text-xs text-[#9194A5] font-normal hover:text-[#72C1FD]">
            查看更多
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditAudio;
