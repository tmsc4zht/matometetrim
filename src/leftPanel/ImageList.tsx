import React from "react";

interface ImageListProps {
  paths: string[];
  onFileClick: (path: string) => void;
}

const ImageList: React.FC<ImageListProps> = ({ paths, onFileClick }) => {
  return (
    <div style={{ marginTop: 16 }}>
      <b>画像一覧:</b>
      <ul style={{ maxHeight: 200, overflow: "auto", fontSize: 12 }}>
        {paths.map((p, i) => (
          <li key={i}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onFileClick(p);
              }}
              style={{
                cursor: "pointer",
                color: "#007bff",
                textDecoration: "underline",
              }}
            >
              {p}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageList;
