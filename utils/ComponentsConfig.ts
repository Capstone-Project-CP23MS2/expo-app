import { Colors, ThemeManager } from "react-native-ui-lib";


export function RNUIThemeManagerInit() {
  ThemeManager.setComponentTheme('Text', (props: any) => {
    const defaultProps = {
      body: true,
      color: Colors.black,
    };

    if (props.red) {
      defaultProps.color = Colors.red30;
    }

    return defaultProps;
  });
  ThemeManager.setComponentTheme('Button', (props: any) => {
    const defaultProps = {
      backgroundColor: Colors.primaryColor,
      bodyB: true,
      width: '100%',
      color: '',
      outline: false,
      outlineColor: '',
      outlineWidth: 0,
    };

    if (props.secondary) {
      defaultProps.backgroundColor = Colors.secondaryColor;
    }
    if (props.upload) {
      defaultProps.backgroundColor = 'transperent';
      defaultProps.color = '#000000';
      defaultProps.outline = true;
      defaultProps.outlineColor = '#000000';
      defaultProps.outlineWidth = 1;
    }

    return defaultProps;
  });

  ThemeManager.setComponentTheme('TextField', () => ({
    containerStyle: {
      borderColor: 'rgba(253, 168, 75, .5)',
      borderWidth: 1,
      borderRadius: 30,
      paddingLeft: 13,
      paddingVertical: 10,
    },
    placeholderTextColor: '#898989',
    bodyB: true,
  }));
}