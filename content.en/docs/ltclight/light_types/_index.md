---
title: LTC Light Types
weight: 4
---

## LTC Lights

Currently we support polygon light, linear light and textured area light. More types will be added in the future such as bezier curve shaped area lights.

There are common attributes for both light types:

| Name               | Description                                                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Color              | Light color in RGB                                                                                                                                                     |
| Intensity          | light intensity                                                                                                                                                        |
| Range              | The space range affected by light, it has different meaning for different light types, **It will not be affected by transform scale, can be visualized when selected** |
| Light Mode         | To use diffuse lighting, specular lighting or both of them                                                                                                             |
| Use World Position | Use object local space or world space for light shapes                                                                                                                 |