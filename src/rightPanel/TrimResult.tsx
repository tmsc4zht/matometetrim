import React from "react";

interface TrimResultProps {
  croppedUrls: Array<string | null>;
}

const TrimResult: React.FC<TrimResultProps> = ({ croppedUrls }) => (
  <section style={{ flex: 1, overflow: "auto" }}>
    <h3 style={{ margin: "0 0 8px 0" }}>トリミング結果</h3>
    {croppedUrls.map((croppedUrl, i) =>
      croppedUrl ? (
        <img
          src={croppedUrl}
          alt="cropped"
          style={{
            maxWidth: 600,
            maxHeight: 600,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
      ) : (
        <div style={{ color: "#888" }}>
          画像を選択し、トリミング値を入力してください
        </div>
      ),
    )}
  </section>
);

export default TrimResult;
