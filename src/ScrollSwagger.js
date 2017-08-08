import React, { Component } from "react";
import {
  Animated,
  View,
  ListView,
  ScrollView,
  Text,
  Dimensions
} from "react-native";
const { height, width } = Dimensions.get("window");

export default class ScrollSwagger extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      scrollY: new Animated.Value(0),
      dataSource: ds.cloneWithRows([
        "Dummy",
        "data",
        "Dummy",
        "data",
        "Dummy",
        "data",
        "Dummy",
        "data",
        "Dummy",
        "data",
        "Dummy",
        "data"
      ])
    };
  }
  renderRow(rowData) {
    console.log(rowData);
    return (
      <View
        style={{
          width: width,
          height: 60,
          borderWidth: 1,
          marginVertical: 10,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>{rowData}</Text>
      </View>
    );
  }
  render() {
    var headMov = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [0, -180, -180]
    });
    var hamovY = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [0, -20, -20]
    });
    var hamovX = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [0, -120, -120]
    });
    var imgOp = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [1, 0, 0]
    });
    var misMovY = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [-50, 50, 50]
    });
    var headColor = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: ["green", "blue"]
    });
    var harot = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderScrollComponent={this.renderScroll.bind(this)}
        />
        <Animated.View
          style={{
            top: -height + 100,
            zIndex: 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "yellow",
            width: 100,
            alignSelf: "center",
            transform: [
              { translateY: hamovY },
              { translateX: hamovX },
              { rotate: harot }
            ]
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "red" }}>
            Hahaha
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            height: 250,
            width: width,
            top: 0,
            backgroundColor: headColor,
            justifyContent: "flex-end",
            flexDirection: "column",
            transform: [{ translateY: headMov }]
          }}
        >
          <Animated.Image
            source={{
              uri: "https://images.alphacoders.com/371/thumb-1920-371.jpg"
            }}
            style={{ bottom: 0, width: width, height: 250, opacity: imgOp }}
          />
        </Animated.View>
      </View>
    );
  }
  _handleScroll(e) {
    // console.log(e.nativeEvent.contentOffset.y, "jvjhvhm");
  }

  renderScroll(props) {
    return (
      <Animated.ScrollView
        {...props}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 250
        }}
        // Declarative API for animations ->
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: this.state.scrollY } }
            }
          ],
          { listener: this._handleScroll.bind(this) },
          {
            useNativeDriver: true // <- Native Driver used for animated events
          }
        )}
      />
    );
  }
}
