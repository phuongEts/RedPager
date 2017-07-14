'user trict';
import React, {
  Component
} from 'react';

import {
  View, ActivityIndicator, StyleSheet
} from 'react-native';

class Loading extends Component {
  render() {
    const { animating } = this.props;
    const { loadingContainer, loadingContent } = Styles;
    return (
      <View style={loadingContainer}>
        <ActivityIndicator
          animating={animating}
          size="large"
          style={loadingContent}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({

});

export default Loading;
