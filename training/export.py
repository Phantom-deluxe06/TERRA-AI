"""
TERRA AI - YOLOv8 ONNX Export Script
Exports trained model to ONNX format for browser inference

Prerequisites:
1. Training completed (runs/eco-detect/v1/weights/best.pt exists)
2. ONNX dependencies installed

Usage:
    python export.py
"""

from ultralytics import YOLO
import os
import shutil

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    model_path = 'runs/eco-detect/v1/weights/best.pt'
    
    print("=" * 60)
    print("TERRA AI - YOLOv8 ONNX Export")
    print("=" * 60)
    
    # Check if trained model exists
    if not os.path.exists(model_path):
        print(f"\n❌ ERROR: Trained model not found at {model_path}")
        print("Please run train.py first!")
        return
    
    print(f"\n📦 Loading model from: {model_path}")
    model = YOLO(model_path)
    
    print("🔄 Exporting to ONNX format...")
    print("   (Optimizing for browser inference)")
    
    # Export to ONNX
    export_path = model.export(
        format='onnx',
        imgsz=640,
        simplify=True,       # Simplify model for smaller size
        opset=12,            # ONNX opset version (compatible with onnxruntime-web)
        dynamic=False,       # Fixed input size for better web performance
        half=False,          # Keep FP32 for browser compatibility
    )
    
    print(f"\n✅ Model exported to: {export_path}")
    
    # Copy to frontend
    frontend_model_path = os.path.join(script_dir, '..', 'frontend', 'public', 'models', 'yolov8n-eco.onnx')
    
    try:
        shutil.copy(export_path, frontend_model_path)
        print(f"✅ Copied to frontend: {frontend_model_path}")
    except Exception as e:
        print(f"\n⚠️  Could not auto-copy to frontend: {e}")
        print("\nManually copy the model:")
        print(f"  FROM: {export_path}")
        print(f"  TO:   {os.path.abspath(frontend_model_path)}")
    
    print("\n" + "=" * 60)
    print("🎉 Export Complete!")
    print("=" * 60)
    print("\nYour model is ready for browser inference.")
    print("Start the frontend to test: cd ../frontend && npm run dev")


if __name__ == "__main__":
    main()
