import { useRef, useEffect } from "react";
import CropForm from "./leftPanel/CropForm";
import ImageList from "./leftPanel/ImageList";

interface LeftPanelProps {
  onImagesChange?: (
    selectedImage: { path: string; content: string } | null,
  ) => void;
  crop: { top: number; left: number; right: number; bottom: number };
  setCrop: (crop: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  }) => void;
  fileContents: { path: string; content: string }[];
  setFileContents: (files: { path: string; content: string }[]) => void;
}

const LeftPanel: React.FC<
  LeftPanelProps & {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
> = ({
  onImagesChange,
  crop,
  setCrop,
  fileContents,
  onChange,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.setAttribute("webkitdirectory", "");
        inputRef.current.setAttribute("directory", "");
      }
      // ...existing code...
    }, []);

    const handleFileClick = (path: string) => {
      const img = fileContents.find(
        (f: { path: string; content: string }) =>
          f.path === path &&
          typeof f.content === "string" &&
          f.content.startsWith("data:image"),
      );
      if (img && onImagesChange) {
        onImagesChange(img);
      } else if (onImagesChange) {
        onImagesChange(null);
      }
    };

    return (
      <div>
        <form>
          <label htmlFor="folderInput">フォルダを選択:</label>
          <br />
          <input
            ref={inputRef}
            id="folderInput"
            type="file"
            style={{ marginTop: 8 }}
            multiple
            onChange={onChange}
          />
        </form>
        <ImageList
          paths={fileContents.map((f) => f.path)}
          onFileClick={handleFileClick}
        />
        <CropForm crop={crop} setCrop={setCrop} />
      </div>
    );
  };

export default LeftPanel;
