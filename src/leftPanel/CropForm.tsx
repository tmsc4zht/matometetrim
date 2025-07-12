import React from 'react';

interface CropFormProps {
    crop: { top: number; left: number; right: number; bottom: number };
    setCrop: (crop: { top: number; left: number; right: number; bottom: number }) => void;
}

const CropForm: React.FC<CropFormProps> = ({ crop, setCrop }) => {
    return (
        <form style={{ marginTop: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                <label style={{ marginRight: 8 }}>TOP</label>
                <input type="number" name="top" style={{ width: 80 }} min={0} value={crop.top} onChange={e => setCrop({ ...crop, top: Number(e.target.value) })} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: 8 }}>LEFT</label>
                    <input type="number" name="left" style={{ width: 80 }} min={0} value={crop.left} onChange={e => setCrop({ ...crop, left: Number(e.target.value) })} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: 8 }}>RIGHT</label>
                    <input type="number" name="right" style={{ width: 80 }} min={0} value={crop.right} onChange={e => setCrop({ ...crop, right: Number(e.target.value) })} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <label style={{ marginRight: 8 }}>BOTTOM</label>
                <input type="number" name="bottom" style={{ width: 80 }} min={0} value={crop.bottom} onChange={e => setCrop({ ...crop, bottom: Number(e.target.value) })} />
            </div>
        </form>
    );
};

export default CropForm;
