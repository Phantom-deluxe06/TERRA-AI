# YOLOv8 Eco-Detection Training

This directory contains scripts to train a custom YOLOv8 model for eco-action detection.

## Prerequisites

1. **Python 3.9+** installed
2. **CUDA-enabled GPU** (RTX 4060 recommended)
3. **Roboflow account** for dataset management

## Quick Start

### 1. Install Dependencies

```bash
cd d:\TERRA-AI\training
pip install -r requirements.txt
```

### 2. Prepare Dataset

1. Go to [Roboflow Universe](https://universe.roboflow.com)
2. Create a project "Terra-AI-Eco-Detection"
3. Fork/import datasets for: solar panels, trees, bicycles, recycling bins
4. Collect 200+ images each for: ev_charger, reusable_bag
5. Export in **YOLOv8 format** → Download ZIP
6. Extract to `datasets/eco-detection/`

Expected structure:
```
datasets/
└── eco-detection/
    ├── train/
    │   └── images/
    │   └── labels/
    ├── valid/
    │   └── images/
    │   └── labels/
    └── test/
        └── images/
        └── labels/
```

### 3. Train Model

```bash
python train.py
```

Training will take ~1-2 hours on RTX 4060. Monitor progress in `runs/eco-detect/v1/`.

### 4. Export to ONNX

```bash
python export.py
```

### 5. Deploy to Frontend

Copy the exported model:
```bash
copy runs\eco-detect\v1\weights\best.onnx ..\frontend\public\models\yolov8n-eco.onnx
```

## Classes

| ID | Class | Token Reward |
|----|-------|--------------|
| 0 | tree | 10 TERRA |
| 1 | solar_panel | 25 TERRA |
| 2 | ev_charger | 15 TERRA |
| 3 | recycling_bin | 5 TERRA |
| 4 | bicycle | 3 TERRA |
| 5 | reusable_bag | 2 TERRA |

## Files

- `requirements.txt` - Python dependencies
- `data.yaml` - Dataset configuration
- `train.py` - Training script
- `export.py` - ONNX export script
