#include "VoltageGenerator.h"

namespace {
    VoltageGenerator::currentVoltage lpCurrentVoltage;
}

namespace VoltageGenerator{
    bool init(){
        return true;
    }
    
    bool setStep(float& nStep){
        lpCurrentVoltage.step = nStep;
        return true;
    }
    
    bool setBounds(float& lowBound, float& highBound){
        lpCurrentVoltage.bounds[0] = lowBound;
        lpCurrentVoltage.bounds[1] = highBound;
        return true;
    }

    bool generate(){
        //could be comibned TODO
        if(lpCurrentVoltage.value >= lpCurrentVoltage.bounds[1]){
            lpCurrentVoltage.step *= -1.0f;
        }
        else if(lpCurrentVoltage.value <= lpCurrentVoltage.bounds[0]){
            lpCurrentVoltage.step *= -1.0f;
        }

        lpCurrentVoltage.value += lpCurrentVoltage.step;       

        return true;
    }

    float& forwardValue(){
        return lpCurrentVoltage.value;
    }
}