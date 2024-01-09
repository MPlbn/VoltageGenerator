#pragma once
#include <stdlib.h>

namespace VoltageGenerator {

    struct currentVoltage {
        float value {0.0f};
        float step {0.0f};
        float bounds[2] {-1.0f, 1.0f};
    };

    bool init();

    bool setStep(float& step);

    bool setBounds(float& lowBound, float& highBound);

    bool generate();

    float& forwardValue();
}