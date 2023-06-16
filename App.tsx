import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { App } from './src/';
// import {
//   View
// } from 'react-native';

const MainApp = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
  // const [state, setState] = React.useState();

  // return (
  //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //     <SearchBox
  //       state={state}
  //       setState={setState}
  //       options={
  //         [
  //           {"label": "Option 1", "value": 1}, {"label": "Option 2", "value": 2},
  //           {"label": "Option 3", "value": 3}, {"label": "Option 4", "value": 4},
  //           {"label": "Option 5", "value": 5}, {"label": "Option 6", "value": 6},
  //           {"label": "Option 7", "value": 7}, {"label": "Option 8", "value": 8},
  //           {"label": "Option 9", "value": 9}, {"label": "Option 10", "value": 10},
  //           {"label": "Option 11", "value": 11}, {"label": "Option 12", "value": 12}
  //         ]
  //       }
  //       placeholder={'Cidade'}
  //       // width={90}
  //     />
  //   </View>
  // );
}

export default MainApp;
// Login: rafaelfonseca1020@gmail.com
// Password: abcdE@