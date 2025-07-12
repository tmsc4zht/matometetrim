import React from 'react';

interface SelectedImageProps {
    selectedImage: { path: string, content: string } | null;
}

const SelectedImage: React.FC<SelectedImageProps> = ({ selectedImage }) => (
    <section style={{ borderBottom: '1px solid #ccc', paddingBottom: 12, minHeight: 0 }}>
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>画像表示</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {selectedImage && selectedImage.content.startsWith('data:image') && (
                <div>
                    <div style={{ fontSize: 12 }}>{selectedImage.path}</div>
                    <img src={selectedImage.content} alt={selectedImage.path} style={{ maxWidth: 200, maxHeight: 200, border: '1px solid #ccc', borderRadius: 4 }} />
                </div>
            )}
        </div>
    </section>
);

export default SelectedImage;
