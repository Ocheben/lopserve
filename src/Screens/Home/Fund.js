import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {List, ListItem, Icon, Spinner} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {onSignOut} from '../../_services';
import {getContri} from '../../_store/actions/userActions';
import {
  SText,
  Content,
  ContentButton,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import {NextIcon} from '../../Components/icons';
import {RsaIcon} from '../../Components/Vectors';

const {height, width} = Dimensions.get('window');

const Fund = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const url = navigation.getParam('url')

  const _renderError = () => (
    <Content justify="center" align="center">
      <SText color={colors.dark} size="30px" weight="700">No Network</SText>
    </Content>
  )

  return (
    <WebView
      source={{uri: url}}
      style={{flex: 1}}
      renderError={() => _renderError()}
      renderLoading={() => <Spinner color={colors.primary} />}
    />
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Fund);
