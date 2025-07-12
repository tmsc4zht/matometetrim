import React from "react";

interface AllImagesProps {
  images: { path: string; content: string }[];
}

const AllImages: React.FC<AllImagesProps> = ({ images }) => (
  <section style={{ borderBottom: "1px solid #ccc", paddingBottom: 12 }}>
    <h3 style={{ margin: "0 0 8px 0" }}>すべての画像</h3>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 8,
      }}
    >
      {images
        .filter((img) => img.content.startsWith("data:image"))
        .map((img, i) => (
          <img
            key={i}
            src={img.content}
            alt={img.path}
            title={img.path}
            style={{
              width: 64,
              height: 64,
              objectFit: "cover",
              border: "1px solid #ccc",
              borderRadius: 4,
              flexShrink: 0, // 画像が縮まないようにする
            }}
          />
        ))}
    </div>
  </section>
);

export default AllImages;
