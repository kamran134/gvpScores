import React, { ReactNode } from "react";
import { View } from "react-native";

const MainComponent: React.FC<{children: ReactNode}> = (props) => {
    return (
        <View>
            {props.children}
        </View>
    );
}

export default MainComponent;