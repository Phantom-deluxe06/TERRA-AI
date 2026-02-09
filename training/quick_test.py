"""
TERRA AI - Quick Test Script 
Downloads pre-trained COCO YOLOv8 and exports to ONNX for quick testing

Use this if you want to test the pipeline before training on custom dataset.
Note: Only detects COCO classes (bicycle, potted plant, etc.), not all eco-actions.

Usage:
    python quick_test.py
"""

from ultralytics import YOLO
import os
import shutil

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    print("=" * 60)
    print("TERRA AI - Quick Test (COCO Pre-trained)")
    print("=" * 60)
    
    print("\n📥 Downloading YOLOv8 nano (pre-trained on COCO)...")
    model = YOLO('yolov8n.pt')
    
    print("🔄 Exporting to ONNX format...")
    export_path = model.export(
        format='onnx',
        imgsz=640,
        simplify=True,
        opset=12,
        dynamic=False,
    )
    
    # Copy to frontend as test model
    frontend_model_path = os.path.join(script_dir, '..', 'frontend', 'public', 'models', 'yolov8n-eco.onnx')
    
    try:
        shutil.copy(export_path, frontend_model_path)
        print(f"\n✅ Test model copied to: {frontend_model_path}")
    except Exception as e:
        print(f"\n⚠️  Manual copy needed: {e}")
    
    print("\n" + "=" * 60)
    print("⚠️  IMPORTANT: This is for TESTING ONLY!")
    print("=" * 60)
    print("""
This model can detect these COCO classes:
- bicycle (class 1)
- potted plant (class 58)

But it CANNOT detect:
- tree, solar_panel, ev_charger, recycling_bin, reusable_bag

You'll need to:
1. Update verify.ts to use COCO class indices temporarily
2. Or train the custom model with your eco-detection dataset

For full functionality, proceed with custom training:
    python train.py
""")


if __name__ == "__main__":
    main()
