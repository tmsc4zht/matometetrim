import React from "react";

interface TrimResultProps {
  croppedUrls: Array<string | null>;
}

const TrimResult: React.FC<TrimResultProps> = ({ croppedUrls }) => (
  <section style={{ flex: 1, overflow: "auto" }}>
    <h3 style={{ margin: "0 0 8px 0" }}>トリミング結果</h3>
    {croppedUrls.length === 0 && (
      <div style={{ color: "#888" }}>
        画像を選択し、トリミング値を入力してください
      </div>
    )}
    {croppedUrls.map((croppedUrl) =>
      croppedUrl ? (
        <img
          key={croppedUrl}
          src={croppedUrl}
          alt="cropped"
          style={{
            maxWidth: 600,
            maxHeight: 600,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
      ) : null,
    )}
  </section>
);

export default TrimResult;
