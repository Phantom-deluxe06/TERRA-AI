"""
TERRA AI - YOLOv8 Training Script
Fine-tunes YOLOv8 nano on eco-detection dataset

Prerequisites:
1. Dataset downloaded from Roboflow and extracted to datasets/eco-detection/
2. Python dependencies installed: pip install -r requirements.txt
3. CUDA-enabled GPU (RTX 4060)

Usage:
    python train.py
"""

from ultralytics import YOLO
import os

def main():
    # Ensure we're in the training directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    print("=" * 60)
    print("TERRA AI - YOLOv8 Eco-Detection Training")
    print("=" * 60)
    
    # Check if dataset exists
    if not os.path.exists("datasets/eco-detection/train"):
        print("\n❌ ERROR: Dataset not found!")
        print("Please download your dataset from Roboflow and extract to:")
        print("  training/datasets/eco-detection/")
        print("\nExpected structure:")
        print("  datasets/eco-detection/train/images/")
        print("  datasets/eco-detection/train/labels/")
        print("  datasets/eco-detection/valid/images/")
        print("  datasets/eco-detection/valid/labels/")
        return
    
    print("\n✅ Dataset found!")
    print("🚀 Starting training... (This may take 1-2 hours on RTX 4060)\n")
    
    # Load YOLOv8 nano pretrained on COCO
    model = YOLO('yolov8n.pt')
    
    # Fine-tune on eco-detection dataset
    results = model.train(
        data='data.yaml',
        epochs=100,              # Number of training epochs
        imgsz=640,               # Input image size
        batch=16,                # Batch size (adjust based on VRAM)
        patience=20,             # Early stopping patience
        device=0,                # GPU device (0 = first GPU)
        project='runs/eco-detect',
        name='v1',
        exist_ok=True,           # Overwrite existing run
        
        # Optimization settings
        optimizer='AdamW',
        lr0=0.001,               # Initial learning rate
        lrf=0.01,                # Final learning rate factor
        
        # Augmentation settings
        hsv_h=0.015,
        hsv_s=0.7,
        hsv_v=0.4,
        degrees=10,
        translate=0.1,
        scale=0.5,
        flipud=0.0,
        fliplr=0.5,
        mosaic=1.0,
        
        # Logging
        verbose=True,
        plots=True,
    )
    
    print("\n" + "=" * 60)
    print("✅ Training Complete!")
    print("=" * 60)
    print("\nBest model saved to: runs/eco-detect/v1/weights/best.pt")
    print("\nNext steps:")
    print("1. Run: python export.py")
    print("2. Check training metrics in: runs/eco-detect/v1/")
    
    return results


if __name__ == "__main__":
    main()
